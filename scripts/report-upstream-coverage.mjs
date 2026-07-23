import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import ts from "typescript";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const defaultRepoRoot = resolve(scriptDirectory, "..");
const defaultBaselinePath = join(scriptDirectory, "upstream-coverage-baseline.json");
const familyPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/;
const componentExportPattern = new RegExp(
  `^\\./components/(${familyPattern.source.slice(1, -1)})$`,
);
const reviewedCategories = [
  "actual-missing-capability",
  "deprecated-upstream-alias",
  "framework-specific-omission",
  "grouped-local-equivalent",
  "partial-local-equivalent",
];

export class CoverageReportError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "CoverageReportError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new CoverageReportError(code, message);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function sortedUnique(values) {
  return [...new Set(values)].sort();
}

function assertObject(value, label, code = "malformed-authority") {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(code, `${label} must be an object`);
  }
  return value;
}

function assertKeys(value, allowed, label, code = "malformed-mappings") {
  const unexpected = Object.keys(value).filter((key) => !allowed.includes(key));
  if (unexpected.length > 0) {
    fail(code, `${label} has unknown keys: ${unexpected.sort().join(", ")}`);
  }
}

function readText(path, label) {
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    fail("missing-authority", `cannot read ${label}: ${error.code ?? error.message}`);
  }
}

function readJson(path, label) {
  const source = readText(path, label);
  try {
    return { source, value: JSON.parse(source) };
  } catch {
    fail("malformed-authority", `${label} is not valid JSON`);
  }
}

function unquoteYamlScalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function parseLockfileKumo(source) {
  const lines = source.split(/\r?\n/);
  const rootImporter = lines.findIndex((line) => line === "  .:");
  if (rootImporter === -1) {
    fail("malformed-lockfile", "pnpm-lock.yaml has no root importer");
  }

  let importerEnd = lines.length;
  for (let index = rootImporter + 1; index < lines.length; index += 1) {
    if (/^  \S.*:$/.test(lines[index])) {
      importerEnd = index;
      break;
    }
  }

  const dependencyIndexes = [];
  for (let index = rootImporter + 1; index < importerEnd; index += 1) {
    if (/^      ['"]?@cloudflare\/kumo['"]?:\s*$/.test(lines[index])) {
      dependencyIndexes.push(index);
    }
  }

  if (dependencyIndexes.length !== 1) {
    fail(
      "malformed-lockfile",
      `expected one root @cloudflare/kumo lock entry, found ${dependencyIndexes.length}`,
    );
  }

  const dependencyStart = dependencyIndexes[0];
  let dependencyEnd = importerEnd;
  for (let index = dependencyStart + 1; index < importerEnd; index += 1) {
    if (/^      \S.*:$/.test(lines[index])) {
      dependencyEnd = index;
      break;
    }
  }

  const fields = {};
  for (const line of lines.slice(dependencyStart + 1, dependencyEnd)) {
    const match = line.match(/^        (specifier|version):\s*(.+?)\s*$/);
    if (match) fields[match[1]] = unquoteYamlScalar(match[2]);
  }

  if (typeof fields.specifier !== "string" || typeof fields.version !== "string") {
    fail("malformed-lockfile", "@cloudflare/kumo lock entry lacks specifier or version");
  }

  const version = fields.version.match(/^(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)(?:\(|$)/)?.[1];
  if (!version) {
    fail("malformed-lockfile", `cannot extract an exact Kumo version from ${fields.version}`);
  }

  const packagesStart = lines.findIndex((line) => line === "packages:");
  if (packagesStart === -1) fail("malformed-lockfile", "pnpm-lock.yaml has no packages section");
  let packagesEnd = lines.length;
  for (let index = packagesStart + 1; index < lines.length; index += 1) {
    if (/^\S.*:$/.test(lines[index])) {
      packagesEnd = index;
      break;
    }
  }

  const packageEntries = [];
  for (let index = packagesStart + 1; index < packagesEnd; index += 1) {
    const match = lines[index].match(/^  ['"]?(@cloudflare\/kumo@[^'"]+)['"]?:\s*$/);
    if (!match || match[1] !== `@cloudflare/kumo@${version}`) continue;
    let entryEnd = lines.length;
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      if (/^  \S.*:$/.test(lines[cursor]) || /^\S.*:$/.test(lines[cursor])) {
        entryEnd = cursor;
        break;
      }
    }
    const entry = lines.slice(index + 1, entryEnd).join("\n");
    const integrity = entry.match(
      /^    resolution:\s*\{[^\n}]*integrity:\s*([^,}\s]+)[^\n}]*\}\s*$/m,
    )?.[1];
    if (!integrity) {
      fail("malformed-lockfile", `${match[1]} lacks a resolution integrity`);
    }
    packageEntries.push({ integrity: unquoteYamlScalar(integrity), packageKey: match[1] });
  }

  if (packageEntries.length !== 1) {
    fail(
      "malformed-lockfile",
      `expected one resolved @cloudflare/kumo@${version} package entry, found ${packageEntries.length}`,
    );
  }

  return { ...packageEntries[0], specifier: fields.specifier, version };
}

export function parseManagedCheckoutVersion(source) {
  const matches = [...source.matchAll(/^upstream_ref=["']@cloudflare\/kumo@([^"']+)["']\s*$/gm)];
  if (matches.length !== 1) {
    fail(
      "malformed-setup",
      `expected one exact @cloudflare/kumo managed-checkout tag, found ${matches.length}`,
    );
  }
  const version = matches[0][1];
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
    fail("malformed-setup", `managed-checkout tag is not an exact version: ${version}`);
  }
  return version;
}

export function assertVersionAuthority({
  installedVersion,
  lockSpecifier,
  lockVersion,
  managedCheckoutVersion,
  workspaceSpecifier,
}) {
  if (workspaceSpecifier !== lockSpecifier) {
    fail(
      "version-mismatch",
      `workspace specifier ${workspaceSpecifier ?? "<missing>"} does not match lockfile ${lockSpecifier}`,
    );
  }
  if (workspaceSpecifier !== installedVersion) {
    fail(
      "version-mismatch",
      `workspace @cloudflare/kumo specifier must exactly pin installed ${installedVersion}, found ${workspaceSpecifier ?? "<missing>"}`,
    );
  }
  const mismatches = [
    ["lockfile", lockVersion],
    ["managed checkout", managedCheckoutVersion],
  ].filter(([, version]) => version !== installedVersion);
  if (mismatches.length > 0) {
    fail(
      "version-mismatch",
      `installed ${installedVersion} does not match ${mismatches.map(([name, version]) => `${name} ${version}`).join(" or ")}`,
    );
  }
}

function resolveRelativeModule(fromPath, specifier) {
  const base = resolve(dirname(fromPath), specifier);
  const extensionlessBase = base.replace(/\.(?:c|m)?js$/, "");
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.d.ts`,
    `${extensionlessBase}.ts`,
    `${extensionlessBase}.d.ts`,
    `${extensionlessBase}.d.mts`,
    `${extensionlessBase}.d.cts`,
    join(base, "index.ts"),
    join(base, "index.d.ts"),
  ];
  const matches = sortedUnique(candidates).filter(
    (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
  );
  if (matches.length === 0) {
    fail("unreadable-declarations", `cannot resolve relative export ${specifier}`);
  }
  return matches[0];
}

function addBindingNames(name, names, path) {
  if (ts.isIdentifier(name)) {
    names.push(name.text);
    return;
  }
  fail("unsupported-declaration", `unsupported exported binding in ${path}`);
}

function pathWithinRoot(root, path) {
  const child = relative(root, path);
  return child !== "" && !child.startsWith("..") && !isAbsolute(child);
}

function declarationPath(root, path) {
  return relative(root, path).replaceAll("\\", "/");
}

function readDeclarationGraph(path, packageRoot) {
  const canonicalRoot = realpathSync(packageRoot);
  const sourceFiles = new Map();
  const files = new Map();
  const visiting = new Set();

  function visit(targetPath) {
    const canonicalPath = realpathSync(targetPath);
    if (!pathWithinRoot(canonicalRoot, canonicalPath)) {
      fail("unreadable-declarations", `relative declaration escapes its package: ${targetPath}`);
    }
    if (sourceFiles.has(canonicalPath) || visiting.has(canonicalPath)) return;
    visiting.add(canonicalPath);

    let bytes;
    try {
      bytes = readFileSync(canonicalPath);
    } catch (error) {
      fail("unreadable-declarations", `cannot read declarations: ${error.code ?? error.message}`);
    }
    const source = bytes.toString("utf8");
    const sourceFile = ts.createSourceFile(
      canonicalPath,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    if (sourceFile.parseDiagnostics.length > 0) {
      const diagnostic = sourceFile.parseDiagnostics[0];
      fail(
        "malformed-declarations",
        `TypeScript could not parse ${declarationPath(canonicalRoot, canonicalPath)}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`,
      );
    }

    const relativePath = declarationPath(canonicalRoot, canonicalPath);
    const digest = sha256(bytes);
    const existing = files.get(relativePath);
    if (existing && existing !== digest) {
      fail(
        "duplicate-authority",
        `duplicate declaration identity has different bytes: ${relativePath}`,
      );
    }
    files.set(relativePath, digest);
    sourceFiles.set(canonicalPath, sourceFile);

    const visitSpecifier = (specifier) => {
      if (!specifier.startsWith(".")) return;
      visit(resolveRelativeModule(canonicalPath, specifier));
    };
    for (const reference of sourceFile.referencedFiles) {
      visit(resolveRelativeModule(canonicalPath, reference.fileName));
    }
    for (const statement of sourceFile.statements) {
      if (
        (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) &&
        statement.moduleSpecifier &&
        ts.isStringLiteral(statement.moduleSpecifier)
      ) {
        visitSpecifier(statement.moduleSpecifier.text);
      } else if (
        ts.isImportEqualsDeclaration(statement) &&
        ts.isExternalModuleReference(statement.moduleReference) &&
        statement.moduleReference.expression &&
        ts.isStringLiteral(statement.moduleReference.expression)
      ) {
        visitSpecifier(statement.moduleReference.expression.text);
      }
    }
    const visitInlineImports = (node) => {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        visitSpecifier(node.moduleSpecifier.text);
      } else if (
        ts.isImportEqualsDeclaration(node) &&
        ts.isExternalModuleReference(node.moduleReference) &&
        node.moduleReference.expression &&
        ts.isStringLiteral(node.moduleReference.expression)
      ) {
        visitSpecifier(node.moduleReference.expression.text);
      }
      if (
        ts.isImportTypeNode(node) &&
        ts.isLiteralTypeNode(node.argument) &&
        ts.isStringLiteral(node.argument.literal)
      ) {
        visitSpecifier(node.argument.literal.text);
      }
      if (
        ts.isModuleDeclaration(node) &&
        ts.isStringLiteral(node.name) &&
        node.name.text.startsWith(".")
      ) {
        fail("unsupported-declaration", "relative ambient module declarations are unsupported");
      }
      ts.forEachChild(node, visitInlineImports);
    };
    visitInlineImports(sourceFile);
    visiting.delete(canonicalPath);
  }

  visit(path);
  return { canonicalRoot, files, sourceFiles };
}

function exportedNames(path, graph, active = new Set(), cache = new Map()) {
  const canonicalPath = realpathSync(path);
  if (cache.has(canonicalPath)) return cache.get(canonicalPath);
  if (active.has(canonicalPath)) return [];
  active.add(canonicalPath);
  const sourceFile = graph.sourceFiles.get(canonicalPath);
  if (!sourceFile) fail("unreadable-declarations", `declaration graph omitted ${canonicalPath}`);

  const names = [];
  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement)) {
      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) names.push(element.name.text);
        continue;
      }
      if (statement.exportClause && ts.isNamespaceExport(statement.exportClause)) {
        names.push(statement.exportClause.name.text);
        continue;
      }
      if (!statement.moduleSpecifier || !ts.isStringLiteral(statement.moduleSpecifier)) {
        fail("unsupported-declaration", "unsupported export declaration");
      }
      if (!statement.moduleSpecifier.text.startsWith(".")) {
        fail("unsupported-declaration", "cannot inventory an export-all from an external package");
      }
      const target = resolveRelativeModule(canonicalPath, statement.moduleSpecifier.text);
      names.push(...exportedNames(target, graph, active, cache));
      continue;
    }

    if (ts.isExportAssignment(statement)) {
      names.push("default");
      continue;
    }

    const modifiers = statement.modifiers ?? [];
    if (!modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    const isDefault = modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword);
    if (isDefault) {
      names.push("default");
      continue;
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        addBindingNames(declaration.name, names, canonicalPath);
      }
      continue;
    }

    if (
      ts.isClassDeclaration(statement) ||
      ts.isEnumDeclaration(statement) ||
      ts.isFunctionDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isImportEqualsDeclaration(statement)
    ) {
      if (!statement.name) fail("unsupported-declaration", "unnamed exported declaration");
      names.push(statement.name.text);
      continue;
    }

    fail(
      "unsupported-declaration",
      `unsupported exported TypeScript syntax kind ${statement.kind}`,
    );
  }

  active.delete(canonicalPath);
  const result = sortedUnique(names);
  cache.set(canonicalPath, result);
  return result;
}

export function parseDeclaredExports(path, visited = new Set()) {
  const canonicalPath = realpathSync(path);
  if (visited.has(canonicalPath)) return [];
  visited.add(canonicalPath);
  let source;
  try {
    source = readFileSync(canonicalPath, "utf8");
  } catch (error) {
    fail("unreadable-declarations", `cannot read declarations: ${error.code ?? error.message}`);
  }
  const sourceFile = ts.createSourceFile(
    canonicalPath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  if (sourceFile.parseDiagnostics.length > 0) {
    fail("malformed-declarations", `TypeScript could not parse ${canonicalPath}`);
  }

  const names = [];
  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement)) {
      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) names.push(element.name.text);
        continue;
      }
      if (statement.exportClause && ts.isNamespaceExport(statement.exportClause)) {
        names.push(statement.exportClause.name.text);
        continue;
      }
      if (!statement.moduleSpecifier || !ts.isStringLiteral(statement.moduleSpecifier)) {
        fail("unsupported-declaration", "unsupported export declaration");
      }
      if (!statement.moduleSpecifier.text.startsWith(".")) {
        fail("unsupported-declaration", "cannot inventory an export-all from an external package");
      }
      names.push(
        ...parseDeclaredExports(
          resolveRelativeModule(canonicalPath, statement.moduleSpecifier.text),
          visited,
        ),
      );
      continue;
    }
    if (ts.isExportAssignment(statement)) {
      names.push("default");
      continue;
    }
    const modifiers = statement.modifiers ?? [];
    if (!modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    if (modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword)) {
      names.push("default");
      continue;
    }
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        addBindingNames(declaration.name, names, canonicalPath);
      }
      continue;
    }
    if (
      ts.isClassDeclaration(statement) ||
      ts.isEnumDeclaration(statement) ||
      ts.isFunctionDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isImportEqualsDeclaration(statement)
    ) {
      if (!statement.name) fail("unsupported-declaration", "unnamed exported declaration");
      names.push(statement.name.text);
      continue;
    }
    fail(
      "unsupported-declaration",
      `unsupported exported TypeScript syntax kind ${statement.kind}`,
    );
  }
  return sortedUnique(names);
}

function readDeclaredExportInventory(path, packageRoot) {
  const graph = readDeclarationGraph(path, packageRoot);
  return {
    declarationFiles: [...graph.files.entries()]
      .map(([filePath, digest]) => ({ path: filePath, sha256: digest }))
      .sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0)),
    declarations: exportedNames(path, graph),
  };
}

function resolvePackageTarget(packageRoot, target, exportPath) {
  if (typeof target !== "string" || !target.startsWith("./")) {
    fail("malformed-exports", `${exportPath} must have a relative types target`);
  }
  const path = resolve(packageRoot, target);
  const pathWithinPackage = relative(packageRoot, path);
  if (pathWithinPackage.startsWith("..") || isAbsolute(pathWithinPackage)) {
    fail("malformed-exports", `${exportPath} types target escapes its package`);
  }
  if (!existsSync(path) || !statSync(path).isFile()) {
    fail("missing-authority", `${exportPath} types target does not exist`);
  }
  return path;
}

export function readFamilyInventory(packageRoot, packageJson, authority, options = {}) {
  assertObject(packageJson, `${authority} package.json`);
  const exports = assertObject(packageJson.exports, `${authority} package exports`);
  const entries = [];

  for (const exportPath of Object.keys(exports).sort()) {
    const match = exportPath.match(componentExportPattern);
    if (!match) {
      if (exportPath.startsWith("./components/")) {
        fail(
          "unsupported-export-path",
          `${authority} has unsupported component export ${exportPath}`,
        );
      }
      continue;
    }
    const config = assertObject(exports[exportPath], `${authority} ${exportPath}`);
    const typesPath = resolvePackageTarget(packageRoot, config.types, exportPath);
    const { declarationFiles, declarations } =
      options.includeDeclarationContent === false
        ? { declarationFiles: [], declarations: parseDeclaredExports(typesPath) }
        : readDeclaredExportInventory(typesPath, packageRoot);
    if (declarations.length === 0) {
      fail("empty-inventory", `${authority} ${exportPath} has no declared exports`);
    }
    const entry = {
      declarations,
      evidenceKey: `component:${match[1]}`,
      exportPath,
      family: match[1],
    };
    if (options.includeDeclarationContent === false) {
      entries.push(entry);
    } else {
      const factualEntry = { declarationFiles, ...entry };
      entries.push({ ...factualEntry, declarationDigest: digestValue(factualEntry) });
    }
  }

  if (entries.length === 0) {
    fail("empty-inventory", `${authority} has no public component export families`);
  }
  return entries;
}

function requireReason(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    fail("malformed-mappings", `${label} requires a non-empty reason`);
  }
  return value.trim();
}

function requireFamily(value, label) {
  if (typeof value !== "string" || !familyPattern.test(value)) {
    fail("malformed-mappings", `${label} must be a kebab-case family name`);
  }
  return value;
}

function requireExport(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    fail("malformed-mappings", `${label} must be a non-empty export name`);
  }
  return value;
}

function requireArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    fail("malformed-mappings", `${label} must be a non-empty array`);
  }
  return value;
}

function requireSourcePath(value, label) {
  if (
    typeof value !== "string" ||
    value.trim().length === 0 ||
    isAbsolute(value) ||
    value.split("/").includes("..")
  ) {
    fail("malformed-mappings", `${label} must be a repository-relative source path`);
  }
  return value.trim();
}

function validateNoDuplicates(values, label) {
  if (new Set(values).size !== values.length) {
    fail("duplicate-mapping", `${label} contains duplicate mappings`);
  }
}

export function validateMappings(input, options = {}) {
  const value = assertObject(input, "mapping config", "malformed-mappings");
  const topLevelKeys = [
    "schemaVersion",
    "reviewedUpstreamVersion",
    "familyMappings",
    "intentionalUpstreamFamilies",
    "intentionalLocalFamilies",
    "reviewedUpstreamExports",
  ];
  assertKeys(value, topLevelKeys, "mapping config");
  if (value.schemaVersion !== 2) {
    fail("malformed-mappings", `unsupported mapping schema version: ${value.schemaVersion}`);
  }
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(value.reviewedUpstreamVersion)) {
    fail(
      "malformed-mappings",
      `reviewedUpstreamVersion must be an exact version: ${value.reviewedUpstreamVersion}`,
    );
  }

  const arrays = topLevelKeys.slice(2);
  for (const key of arrays) {
    if (!Array.isArray(value[key])) fail("malformed-mappings", `${key} must be an array`);
  }

  const familyMappings = value.familyMappings.map((entry, index) => {
    assertObject(entry, `familyMappings[${index}]`, "malformed-mappings");
    assertKeys(entry, ["upstream", "locals", "kind", "reason"], `familyMappings[${index}]`);
    if (!["renamed", "grouped"].includes(entry.kind)) {
      fail("malformed-mappings", `familyMappings[${index}] has an unknown kind`);
    }
    const locals = requireArray(entry.locals, `familyMappings[${index}].locals`).map((family) =>
      requireFamily(family, `familyMappings[${index}].locals`),
    );
    validateNoDuplicates(locals, `familyMappings[${index}].locals`);
    return {
      kind: entry.kind,
      locals: [...locals].sort(),
      reason: requireReason(entry.reason, `familyMappings[${index}]`),
      upstream: requireFamily(entry.upstream, `familyMappings[${index}].upstream`),
    };
  });

  const intentionalFamilies = (entries, side) =>
    entries.map((entry, index) => {
      assertObject(entry, `intentional${side}Families[${index}]`, "malformed-mappings");
      const key = side === "Upstream" ? "upstream" : "local";
      assertKeys(entry, [key, "reason"], `intentional${side}Families[${index}]`);
      return {
        family: requireFamily(entry[key], `intentional${side}Families[${index}].${key}`),
        reason: requireReason(entry.reason, `intentional${side}Families[${index}]`),
      };
    });

  const reviewedUpstreamExports = value.reviewedUpstreamExports.map((entry, index) => {
    const label = `reviewedUpstreamExports[${index}]`;
    assertObject(entry, label, "malformed-mappings");
    assertKeys(entry, ["family", "export", "category", "local", "reason", "sources"], label);
    if (!reviewedCategories.includes(entry.category)) {
      fail("malformed-mappings", `${label} has an unknown category: ${entry.category}`);
    }
    if (!Array.isArray(entry.local)) {
      fail("malformed-mappings", `${label}.local must be an array`);
    }
    const local = entry.local.map((symbol, localIndex) => {
      const symbolLabel = `${label}.local[${localIndex}]`;
      assertObject(symbol, symbolLabel, "malformed-mappings");
      assertKeys(symbol, ["family", "export"], symbolLabel);
      return {
        export: requireExport(symbol.export, `${symbolLabel}.export`),
        family: requireFamily(symbol.family, `${symbolLabel}.family`),
      };
    });
    validateNoDuplicates(
      local.map((symbol) => `${symbol.family}\0${symbol.export}`),
      `${label}.local`,
    );

    const localCount = local.length;
    if (
      ["grouped-local-equivalent", "partial-local-equivalent"].includes(entry.category) &&
      localCount === 0
    ) {
      fail("malformed-mappings", `${label}.${entry.category} requires a local reference`);
    }
    if (
      ["actual-missing-capability", "framework-specific-omission"].includes(entry.category) &&
      localCount !== 0
    ) {
      fail("malformed-mappings", `${label}.${entry.category} cannot claim a local reference`);
    }
    if (entry.category === "deprecated-upstream-alias" && localCount > 1) {
      fail(
        "malformed-mappings",
        `${label}.deprecated-upstream-alias accepts at most one analogous local reference`,
      );
    }

    const sources = assertObject(entry.sources, `${label}.sources`, "malformed-mappings");
    assertKeys(sources, ["upstream", "local"], `${label}.sources`);
    const parseSources = (side) => {
      const paths = requireArray(sources[side], `${label}.sources.${side}`).map((path, pathIndex) =>
        requireSourcePath(path, `${label}.sources.${side}[${pathIndex}]`),
      );
      validateNoDuplicates(paths, `${label}.sources.${side}`);
      if (side === "local" && options.repoRoot) {
        for (const path of paths) {
          const absolutePath = resolve(options.repoRoot, path);
          if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) {
            fail("stale-mapping", `${label}.sources.local does not exist: ${path}`);
          }
        }
      }
      return [...paths].sort();
    };

    return {
      category: entry.category,
      export: requireExport(entry.export, `${label}.export`),
      family: requireFamily(entry.family, `${label}.family`),
      local: [...local].sort((left, right) =>
        `${left.family}\0${left.export}`.localeCompare(`${right.family}\0${right.export}`),
      ),
      reason: requireReason(entry.reason, label),
      sources: { local: parseSources("local"), upstream: parseSources("upstream") },
    };
  });

  const normalized = {
    familyMappings,
    intentionalLocalFamilies: intentionalFamilies(value.intentionalLocalFamilies, "Local"),
    intentionalUpstreamFamilies: intentionalFamilies(value.intentionalUpstreamFamilies, "Upstream"),
    reviewedUpstreamExports,
    reviewedUpstreamVersion: value.reviewedUpstreamVersion,
    schemaVersion: 2,
  };

  validateNoDuplicates(
    familyMappings.map((entry) => entry.upstream),
    "familyMappings upstream",
  );
  validateNoDuplicates(
    familyMappings.flatMap((entry) => entry.locals),
    "familyMappings local",
  );
  validateNoDuplicates(
    normalized.intentionalUpstreamFamilies.map((entry) => entry.family),
    "intentionalUpstreamFamilies",
  );
  validateNoDuplicates(
    normalized.intentionalLocalFamilies.map((entry) => entry.family),
    "intentionalLocalFamilies",
  );
  validateNoDuplicates(
    reviewedUpstreamExports.map((entry) => `${entry.family}\0${entry.export}`),
    "reviewedUpstreamExports",
  );

  return normalized;
}

function inventoryMap(inventory) {
  return new Map(inventory.map((entry) => [entry.family, entry]));
}

function declarationExists(inventory, symbol) {
  return inventory.get(symbol.family)?.declarations.includes(symbol.export) ?? false;
}

export function classifyCoverage(
  upstreamInventory,
  localInventory,
  mappingsInput,
  upstreamVersion,
  options = {},
) {
  const mappings = validateMappings(mappingsInput, options);
  if (mappings.reviewedUpstreamVersion !== upstreamVersion) {
    fail(
      "version-mismatch",
      `mapping review targets ${mappings.reviewedUpstreamVersion}, not installed upstream ${upstreamVersion ?? "<missing>"}`,
    );
  }
  const upstream = inventoryMap(upstreamInventory);
  const local = inventoryMap(localInventory);

  for (const mapping of mappings.familyMappings) {
    if (!upstream.has(mapping.upstream)) {
      fail("stale-mapping", `mapped upstream family does not exist: ${mapping.upstream}`);
    }
    for (const family of mapping.locals) {
      if (!local.has(family))
        fail("stale-mapping", `mapped local family does not exist: ${family}`);
    }
  }
  for (const entry of mappings.intentionalUpstreamFamilies) {
    if (!upstream.has(entry.family)) {
      fail("stale-mapping", `intentional upstream family does not exist: ${entry.family}`);
    }
    if (
      local.has(entry.family) ||
      mappings.familyMappings.some((mapping) => mapping.upstream === entry.family)
    ) {
      fail("stale-mapping", `intentional upstream family now has a local mapping: ${entry.family}`);
    }
  }
  for (const entry of mappings.intentionalLocalFamilies) {
    if (!local.has(entry.family)) {
      fail("stale-mapping", `intentional local family does not exist: ${entry.family}`);
    }
  }
  for (const review of mappings.reviewedUpstreamExports) {
    const upstreamSymbol = { export: review.export, family: review.family };
    if (!declarationExists(upstream, upstreamSymbol)) {
      fail(
        "stale-mapping",
        `reviewed upstream declaration does not exist: ${review.family}.${review.export}`,
      );
    }
    const mappedLocalFamilies =
      mappings.familyMappings.find((mapping) => mapping.upstream === review.family)?.locals ??
      (local.has(review.family) ? [review.family] : []);
    if (mappedLocalFamilies.length === 0) {
      fail(
        "stale-mapping",
        `reviewed upstream declaration belongs to an unmapped family: ${review.family}.${review.export}`,
      );
    }
    for (const localSymbol of review.local) {
      if (!declarationExists(local, localSymbol)) {
        fail(
          "stale-mapping",
          `reviewed local declaration does not exist: ${localSymbol.family}.${localSymbol.export}`,
        );
      }
    }
  }
  const familyMappings = new Map(mappings.familyMappings.map((entry) => [entry.upstream, entry]));
  const intentionalUpstreamFamilies = new Map(
    mappings.intentionalUpstreamFamilies.map((entry) => [entry.family, entry]),
  );
  const intentionalLocalFamilies = new Map(
    mappings.intentionalLocalFamilies.map((entry) => [entry.family, entry]),
  );
  const reviewedUpstreamExports = new Map(
    mappings.reviewedUpstreamExports.map((entry) => [`${entry.family}\0${entry.export}`, entry]),
  );
  const claimedLocalFamilies = new Set();
  const entries = [];

  for (const upstreamEntry of upstreamInventory) {
    const familyMapping = familyMappings.get(upstreamEntry.family);
    const localFamilies = familyMapping
      ? familyMapping.locals
      : local.has(upstreamEntry.family)
        ? [upstreamEntry.family]
        : [];
    for (const family of localFamilies) claimedLocalFamilies.add(family);

    if (localFamilies.length === 0) {
      const intentional = intentionalUpstreamFamilies.get(upstreamEntry.family);
      entries.push({
        classification: intentional ? "reviewed-difference" : "upstream-only",
        evidenceKey: `component:${upstreamEntry.family}`,
        exportCorrespondence: {
          reviewed: intentional
            ? upstreamEntry.declarations.map((name) => ({
                category: "omitted-family",
                name,
                reason: intentional.reason,
              }))
            : [],
          investigate: intentional ? [] : upstreamEntry.declarations,
          matched: [],
        },
        local: null,
        upstream: upstreamEntry,
      });
      continue;
    }

    const localDeclarations = sortedUnique(
      localFamilies.flatMap((family) => local.get(family).declarations),
    );
    const matched = [];
    const investigate = [];
    const reviewed = [];
    for (const name of upstreamEntry.declarations) {
      if (localDeclarations.includes(name)) {
        if (reviewedUpstreamExports.has(`${upstreamEntry.family}\0${name}`)) {
          fail(
            "stale-mapping",
            `reviewed upstream declaration now has an exact local match: ${upstreamEntry.family}.${name}`,
          );
        }
        matched.push(name);
        continue;
      }
      const review = reviewedUpstreamExports.get(`${upstreamEntry.family}\0${name}`);
      if (review) {
        reviewed.push({
          category: review.category,
          local: review.local,
          name,
          reason: review.reason,
          sources: review.sources,
        });
        continue;
      }
      investigate.push(name);
    }

    const classification =
      investigate.length > 0
        ? "investigate"
        : familyMapping || reviewed.length > 0
          ? "reviewed-difference"
          : "matched";
    entries.push({
      classification,
      evidenceKey: `component:${upstreamEntry.family}`,
      exportCorrespondence: { investigate, matched, reviewed },
      local: {
        declarationCount: localDeclarations.length,
        exportPaths: localFamilies.map((family) => local.get(family).exportPath),
        families: localFamilies,
        supplementalDeclarationCount: localDeclarations.filter(
          (name) => !upstreamEntry.declarations.includes(name),
        ).length,
      },
      mapping: familyMapping
        ? { kind: familyMapping.kind, reason: familyMapping.reason }
        : undefined,
      upstream: upstreamEntry,
    });
  }

  for (const family of intentionalLocalFamilies.keys()) {
    if (claimedLocalFamilies.has(family)) {
      fail("stale-mapping", `intentional local family now has an upstream mapping: ${family}`);
    }
  }

  for (const localEntry of localInventory) {
    if (claimedLocalFamilies.has(localEntry.family)) continue;
    const intentional = intentionalLocalFamilies.get(localEntry.family);
    entries.push({
      classification: intentional ? "reviewed-difference" : "local-only",
      evidenceKey: `local-component:${localEntry.family}`,
      exportCorrespondence: {
        reviewed: intentional
          ? [{ category: "intentional-local-only", reason: intentional.reason }]
          : [],
        investigate: [],
        matched: [],
      },
      local: {
        declarationCount: localEntry.declarations.length,
        exportPaths: [localEntry.exportPath],
        families: [localEntry.family],
        supplementalDeclarationCount: localEntry.declarations.length,
      },
      upstream: null,
    });
  }

  entries.sort((left, right) =>
    left.evidenceKey < right.evidenceKey ? -1 : left.evidenceKey > right.evidenceKey ? 1 : 0,
  );
  const classifications = [
    "matched",
    "investigate",
    "upstream-only",
    "local-only",
    "reviewed-difference",
  ];
  const summary = Object.fromEntries(
    classifications.map((classification) => [
      classification,
      entries.filter((entry) => entry.classification === classification).length,
    ]),
  );
  summary.investigateDeclarations = entries.reduce(
    (count, entry) => count + entry.exportCorrespondence.investigate.length,
    0,
  );
  summary.localFamilies = localInventory.length;
  summary.reviewedCategories = Object.fromEntries(
    reviewedCategories.map((category) => [
      category,
      mappings.reviewedUpstreamExports.filter((entry) => entry.category === category).length,
    ]),
  );
  summary.reviewedDeclarations = mappings.reviewedUpstreamExports.length;
  summary.upstreamDeclarations = upstreamInventory.reduce(
    (count, entry) => count + entry.declarations.length,
    0,
  );
  summary.upstreamFamilies = upstreamInventory.length;

  const status =
    summary.investigate > 0 || summary["upstream-only"] > 0 || summary["local-only"] > 0
      ? "failed"
      : "passed";
  return {
    entries,
    mappingAuthority: {
      reviewedUpstreamVersion: mappings.reviewedUpstreamVersion,
      schemaVersion: mappings.schemaVersion,
    },
    status,
    summary,
  };
}

export function compareReleases(previousInventory, currentInventory, fromVersion, toVersion) {
  if (fromVersion === toVersion) {
    fail("version-mismatch", "previous and current upstream versions must differ");
  }
  const previous = inventoryMap(previousInventory);
  const current = inventoryMap(currentInventory);
  const familiesAdded = [...current.keys()].filter((family) => !previous.has(family)).sort();
  const familiesRemoved = [...previous.keys()].filter((family) => !current.has(family)).sort();
  const declarationsChanged = [];
  for (const family of [...current.keys()].filter((name) => previous.has(name)).sort()) {
    const added = current
      .get(family)
      .declarations.filter((name) => !previous.get(family).declarations.includes(name));
    const removed = previous
      .get(family)
      .declarations.filter((name) => !current.get(family).declarations.includes(name));
    if (added.length > 0 || removed.length > 0)
      declarationsChanged.push({ added, family, removed });
  }
  return {
    changes: { declarationsChanged, familiesAdded, familiesRemoved },
    fromVersion,
    status: "review-required",
    toVersion,
  };
}

function readPackage(packageJsonPath, authority) {
  const { source, value } = readJson(packageJsonPath, `${authority} package.json`);
  const packageJson = assertObject(value, `${authority} package.json`);
  if (typeof packageJson.name !== "string" || typeof packageJson.version !== "string") {
    fail("malformed-authority", `${authority} package.json lacks name or version`);
  }
  return {
    packageJson,
    packageJsonSha256: sha256(source),
    packageRoot: dirname(packageJsonPath),
  };
}

function normalizeRepository(repository) {
  if (typeof repository === "string") return repository;
  if (repository && typeof repository.url === "string") return repository.url;
  return null;
}

function digestValue(value) {
  return sha256(JSON.stringify(canonicalize(value)));
}

function exactVersion(value, label, code) {
  if (typeof value !== "string" || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(value)) {
    fail(code, `${label} must be an exact version`);
  }
  return value;
}

function hashValue(value, label, code) {
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/.test(value)) {
    fail(code, `${label} must be a lowercase SHA-256 digest`);
  }
  return value;
}

function sortedWithoutDuplicates(values, label, code, identity = (value) => value) {
  const identities = values.map(identity);
  if (new Set(identities).size !== identities.length) {
    fail(code, `${label} contains duplicate identities`);
  }
  const sorted = [...identities].sort();
  if (identities.some((value, index) => value !== sorted[index])) {
    fail(code, `${label} must be sorted deterministically`);
  }
}

export function createAcceptedBaseline({
  integrity,
  inventory,
  packageJsonSha256,
  packageKey,
  specifier,
  version,
  workspaceSpecifier,
}) {
  const families = inventory.map((entry) => ({
    declarationDigest: entry.declarationDigest,
    declarationFileCount: entry.declarationFiles.length,
    declarations: entry.declarations,
    evidenceKey: entry.evidenceKey,
    exportPath: entry.exportPath,
    family: entry.family,
  }));
  return {
    authority: {
      lock: { integrity, packageKey, specifier, version },
      package: "@cloudflare/kumo",
      packageJsonSha256,
      version,
      workspaceSpecifier,
    },
    inventory: {
      digest: digestValue(families),
      families,
    },
    schemaVersion: 1,
  };
}

export function validateAcceptedBaseline(input) {
  const code = "malformed-baseline";
  const baseline = assertObject(input, "accepted upstream baseline", code);
  assertKeys(
    baseline,
    ["schemaVersion", "authority", "inventory"],
    "accepted upstream baseline",
    code,
  );
  if (baseline.schemaVersion !== 1) {
    fail(
      "unsupported-baseline-schema",
      `unsupported accepted upstream baseline schema: ${baseline.schemaVersion}`,
    );
  }

  const authority = assertObject(baseline.authority, "baseline authority", code);
  assertKeys(
    authority,
    ["package", "version", "workspaceSpecifier", "lock", "packageJsonSha256"],
    "baseline authority",
    code,
  );
  if (authority.package !== "@cloudflare/kumo") {
    fail("stale-baseline", `baseline package must be @cloudflare/kumo, found ${authority.package}`);
  }
  const version = exactVersion(authority.version, "baseline authority.version", code);
  if (authority.workspaceSpecifier !== version) {
    fail("stale-baseline", "baseline workspace specifier does not exactly match its version");
  }
  hashValue(authority.packageJsonSha256, "baseline packageJsonSha256", code);

  const lock = assertObject(authority.lock, "baseline lock authority", code);
  assertKeys(
    lock,
    ["integrity", "packageKey", "specifier", "version"],
    "baseline lock authority",
    code,
  );
  if (lock.version !== version || lock.specifier !== version) {
    fail("stale-baseline", "baseline lock version and specifier do not match its version");
  }
  if (lock.packageKey !== `@cloudflare/kumo@${version}`) {
    fail("stale-baseline", "baseline resolved lock package key does not match its version");
  }
  if (
    typeof lock.integrity !== "string" ||
    !/^sha(?:256|384|512)-[A-Za-z0-9+/=]+$/.test(lock.integrity)
  ) {
    fail(code, "baseline lock integrity must be an SRI digest");
  }

  const inventory = assertObject(baseline.inventory, "baseline inventory", code);
  assertKeys(inventory, ["digest", "families"], "baseline inventory", code);
  hashValue(inventory.digest, "baseline inventory digest", code);
  if (!Array.isArray(inventory.families) || inventory.families.length === 0) {
    fail("empty-baseline", "baseline inventory must contain component families");
  }

  for (const [index, familyEntry] of inventory.families.entries()) {
    const label = `baseline inventory.families[${index}]`;
    const entry = assertObject(familyEntry, label, code);
    assertKeys(
      entry,
      [
        "declarationDigest",
        "declarationFileCount",
        "declarations",
        "evidenceKey",
        "exportPath",
        "family",
      ],
      label,
      code,
    );
    if (typeof entry.family !== "string" || !familyPattern.test(entry.family)) {
      fail(code, `${label}.family must be a canonical component family`);
    }
    if (entry.exportPath !== `./components/${entry.family}`) {
      fail("stale-baseline", `${label}.exportPath does not match its family`);
    }
    if (entry.evidenceKey !== `component:${entry.family}`) {
      fail("stale-baseline", `${label}.evidenceKey does not match its family`);
    }
    if (!Array.isArray(entry.declarations) || entry.declarations.length === 0) {
      fail("empty-baseline", `${label}.declarations must not be empty`);
    }
    if (entry.declarations.some((name) => typeof name !== "string" || name.length === 0)) {
      fail(code, `${label}.declarations must contain names`);
    }
    sortedWithoutDuplicates(
      entry.declarations,
      `${label}.declarations`,
      "duplicate-baseline-identity",
    );
    if (!Number.isSafeInteger(entry.declarationFileCount) || entry.declarationFileCount < 1) {
      fail("empty-baseline", `${label}.declarationFileCount must be positive`);
    }
    hashValue(entry.declarationDigest, `${label}.declarationDigest`, code);
  }
  sortedWithoutDuplicates(
    inventory.families,
    "baseline inventory families",
    "duplicate-baseline-identity",
    (entry) => entry.exportPath,
  );
  for (const identity of ["family", "evidenceKey"]) {
    if (
      new Set(inventory.families.map((entry) => entry[identity])).size !== inventory.families.length
    ) {
      fail(
        "duplicate-baseline-identity",
        `baseline inventory has duplicate ${identity} identities`,
      );
    }
  }
  if (inventory.digest !== digestValue(inventory.families)) {
    fail("stale-baseline", "baseline inventory digest does not match its family facts");
  }
  return baseline;
}

function readAcceptedBaseline(path) {
  let source;
  try {
    source = readFileSync(path, "utf8");
  } catch (error) {
    fail(
      "missing-baseline",
      `cannot read accepted upstream baseline: ${error.code ?? error.message}`,
    );
  }
  let value;
  try {
    value = JSON.parse(source);
  } catch {
    fail("malformed-baseline", "accepted upstream baseline is not valid JSON");
  }
  const baseline = validateAcceptedBaseline(value);
  if (source !== serializeReport(baseline)) {
    fail("noncanonical-baseline", "accepted upstream baseline is not canonically serialized");
  }
  return { baseline, sha256: sha256(source) };
}

export function compareAcceptedBaseline(baselineInput, currentInput) {
  const baseline = validateAcceptedBaseline(baselineInput);
  const current = validateAcceptedBaseline(currentInput);
  const authorityChanges = [];
  const compareAuthority = (field, previous, next) => {
    if (previous !== next)
      authorityChanges.push({ field, from: previous, kind: "changed", to: next });
  };
  compareAuthority("version", baseline.authority.version, current.authority.version);
  compareAuthority(
    "workspaceSpecifier",
    baseline.authority.workspaceSpecifier,
    current.authority.workspaceSpecifier,
  );
  compareAuthority("lock.version", baseline.authority.lock.version, current.authority.lock.version);
  compareAuthority(
    "lock.specifier",
    baseline.authority.lock.specifier,
    current.authority.lock.specifier,
  );
  compareAuthority(
    "lock.packageKey",
    baseline.authority.lock.packageKey,
    current.authority.lock.packageKey,
  );
  compareAuthority(
    "lock.integrity",
    baseline.authority.lock.integrity,
    current.authority.lock.integrity,
  );
  compareAuthority(
    "packageJsonSha256",
    baseline.authority.packageJsonSha256,
    current.authority.packageJsonSha256,
  );
  if (baseline.authority.version === current.authority.version && authorityChanges.length > 0) {
    fail(
      "authority-mismatch",
      `installed ${current.authority.package}@${current.authority.version} identity differs from its accepted baseline without a version change`,
    );
  }

  const previousFamilies = inventoryMap(baseline.inventory.families);
  const currentFamilies = inventoryMap(current.inventory.families);
  const familyChanges = [];
  for (const family of [...currentFamilies.keys()]
    .filter((name) => !previousFamilies.has(name))
    .sort()) {
    const entry = currentFamilies.get(family);
    familyChanges.push({
      declarations: entry.declarations,
      evidenceKey: entry.evidenceKey,
      exportPath: entry.exportPath,
      family,
      kind: "family-added",
    });
  }
  for (const family of [...previousFamilies.keys()]
    .filter((name) => !currentFamilies.has(name))
    .sort()) {
    const entry = previousFamilies.get(family);
    familyChanges.push({
      declarations: entry.declarations,
      evidenceKey: entry.evidenceKey,
      exportPath: entry.exportPath,
      family,
      kind: "family-removed",
    });
  }
  for (const family of [...currentFamilies.keys()]
    .filter((name) => previousFamilies.has(name))
    .sort()) {
    const previous = previousFamilies.get(family);
    const next = currentFamilies.get(family);
    if (previous.exportPath !== next.exportPath) {
      familyChanges.push({
        evidenceKey: next.evidenceKey,
        family,
        from: previous.exportPath,
        kind: "export-path-changed",
        to: next.exportPath,
      });
    }
    const added = next.declarations.filter((name) => !previous.declarations.includes(name));
    const removed = previous.declarations.filter((name) => !next.declarations.includes(name));
    if (added.length > 0 || removed.length > 0) {
      familyChanges.push({
        added,
        evidenceKey: next.evidenceKey,
        family,
        kind: "declaration-names-changed",
        removed,
      });
    }
    if (previous.declarationDigest !== next.declarationDigest) {
      familyChanges.push({
        evidenceKey: next.evidenceKey,
        family,
        fromDigest: previous.declarationDigest,
        kind: "declaration-content-changed",
        stableDeclarationNames: added.length === 0 && removed.length === 0,
        toDigest: next.declarationDigest,
      });
    }
  }
  familyChanges.sort((left, right) =>
    `${left.evidenceKey}\0${left.kind}` < `${right.evidenceKey}\0${right.kind}`
      ? -1
      : `${left.evidenceKey}\0${left.kind}` > `${right.evidenceKey}\0${right.kind}`
        ? 1
        : 0,
  );
  const affectedEvidenceKeys = sortedUnique(familyChanges.map((change) => change.evidenceKey));
  const status =
    authorityChanges.length > 0 || familyChanges.length > 0 ? "review-required" : "unchanged";
  return {
    affectedEvidenceKeys,
    authorityChanges,
    baseline: {
      inventoryDigest: baseline.inventory.digest,
      version: baseline.authority.version,
    },
    boundary:
      "Upstream baseline drift prioritizes release/source review; unchanged machine facts do not prove runtime behavior, accessibility, rendering, visual, interaction, SSR, hydration, or framework parity.",
    current: {
      inventoryDigest: current.inventory.digest,
      version: current.authority.version,
    },
    familyChanges,
    status,
  };
}

function loadCurrentAuthority(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const upstreamPackagePath =
    options.upstreamPackagePath ?? join(repoRoot, "node_modules/@cloudflare/kumo/package.json");
  const localPackagePath =
    options.localPackagePath ?? join(repoRoot, "packages/kumo-svelte/package.json");
  const lockfilePath = options.lockfilePath ?? join(repoRoot, "pnpm-lock.yaml");
  const setupPath = options.setupPath ?? join(repoRoot, ".agents/setup");
  const mappingsPath =
    options.mappingsPath ?? join(repoRoot, "scripts/upstream-coverage-mappings.json");

  const upstream = readPackage(upstreamPackagePath, "upstream");
  const local = readPackage(localPackagePath, "local");
  if (upstream.packageJson.name !== "@cloudflare/kumo") {
    fail("version-mismatch", `expected @cloudflare/kumo, found ${upstream.packageJson.name}`);
  }
  if (local.packageJson.name !== "kumo-svelte") {
    fail("version-mismatch", `expected kumo-svelte, found ${local.packageJson.name}`);
  }

  const lock = parseLockfileKumo(readText(lockfilePath, "pnpm-lock.yaml"));
  const rootPackage = readJson(join(repoRoot, "package.json"), "workspace package.json").value;
  const workspaceSpecifier = rootPackage.devDependencies?.["@cloudflare/kumo"];
  const managedCheckoutVersion = parseManagedCheckoutVersion(
    readText(setupPath, "managed checkout setup"),
  );
  const installedVersion = upstream.packageJson.version;
  assertVersionAuthority({
    installedVersion,
    lockSpecifier: lock.specifier,
    lockVersion: lock.version,
    managedCheckoutVersion,
    workspaceSpecifier,
  });

  const upstreamInventory = readFamilyInventory(
    upstream.packageRoot,
    upstream.packageJson,
    "upstream",
  );
  const localInventory = readFamilyInventory(local.packageRoot, local.packageJson, "local", {
    includeDeclarationContent: false,
  });
  const mappings = readJson(mappingsPath, "upstream coverage mappings");
  const validatedMappings = validateMappings(mappings.value, { repoRoot });
  return {
    installedVersion,
    local,
    localInventory,
    lock,
    managedCheckoutVersion,
    mappings,
    repoRoot,
    upstream,
    upstreamInventory,
    validatedMappings,
    workspaceSpecifier,
  };
}

function currentBaselineFacts(authority) {
  return createAcceptedBaseline({
    integrity: authority.lock.integrity,
    inventory: authority.upstreamInventory,
    packageJsonSha256: authority.upstream.packageJsonSha256,
    packageKey: authority.lock.packageKey,
    specifier: authority.lock.specifier,
    version: authority.installedVersion,
    workspaceSpecifier: authority.workspaceSpecifier,
  });
}

export function buildAcceptedBaseline(options = {}) {
  const authority = loadCurrentAuthority(options);
  if (authority.validatedMappings.reviewedUpstreamVersion !== authority.installedVersion) {
    fail(
      "stale-mapping",
      `cannot update baseline: mappings target ${authority.validatedMappings.reviewedUpstreamVersion}, not installed ${authority.installedVersion}`,
    );
  }
  const coverage = classifyCoverage(
    authority.upstreamInventory,
    authority.localInventory,
    authority.mappings.value,
    authority.installedVersion,
    { repoRoot: authority.repoRoot },
  );
  if (coverage.status !== "passed") {
    fail("unexplained-coverage", "cannot update baseline while current inventory is unexplained");
  }
  return validateAcceptedBaseline(currentBaselineFacts(authority));
}

export function buildCoverageReport(options = {}) {
  const authority = loadCurrentAuthority(options);
  const baselinePath =
    options.baselinePath ?? join(authority.repoRoot, "scripts/upstream-coverage-baseline.json");
  const accepted = readAcceptedBaseline(baselinePath);
  const currentFacts = currentBaselineFacts(authority);
  const baselineDrift = compareAcceptedBaseline(accepted.baseline, currentFacts);
  const mappingVersion = authority.validatedMappings.reviewedUpstreamVersion;
  const baselineVersion = accepted.baseline.authority.version;
  let coverage;
  let mappingStatus;
  if (mappingVersion === authority.installedVersion) {
    coverage = classifyCoverage(
      authority.upstreamInventory,
      authority.localInventory,
      authority.mappings.value,
      authority.installedVersion,
      { repoRoot: authority.repoRoot },
    );
    mappingStatus = "accepted";
  } else if (mappingVersion === baselineVersion) {
    coverage = classifyCoverage(
      authority.upstreamInventory,
      authority.localInventory,
      {
        familyMappings: [],
        intentionalLocalFamilies: [],
        intentionalUpstreamFamilies: [],
        reviewedUpstreamExports: [],
        reviewedUpstreamVersion: authority.installedVersion,
        schemaVersion: 2,
      },
      authority.installedVersion,
    );
    mappingStatus = "review-required";
  } else {
    fail(
      "stale-mapping",
      `mapping review targets ${mappingVersion}, neither accepted baseline ${baselineVersion} nor installed upstream ${authority.installedVersion}`,
    );
  }

  let releaseChanges;
  if (options.previousPackagePath) {
    if (!existsSync(options.previousPackagePath)) {
      fail("missing-authority", "cannot read previous upstream package: ENOENT");
    }
    const previousPath = statSync(options.previousPackagePath).isDirectory()
      ? join(options.previousPackagePath, "package.json")
      : options.previousPackagePath;
    const previous = readPackage(previousPath, "previous upstream");
    if (previous.packageJson.name !== "@cloudflare/kumo") {
      fail(
        "version-mismatch",
        `previous package is ${previous.packageJson.name}, not @cloudflare/kumo`,
      );
    }
    const previousInventory = readFamilyInventory(
      previous.packageRoot,
      previous.packageJson,
      "previous upstream",
    );
    releaseChanges = compareReleases(
      previousInventory,
      authority.upstreamInventory,
      previous.packageJson.version,
      authority.installedVersion,
    );
  } else {
    releaseChanges = {
      ...baselineDrift,
      source: "accepted-baseline",
    };
  }

  const status =
    baselineDrift.status === "review-required" || coverage.status !== "passed"
      ? "review-required"
      : "unchanged";

  return {
    acceptedBaseline: {
      path: relative(authority.repoRoot, baselinePath).replaceAll("\\", "/"),
      schemaVersion: accepted.baseline.schemaVersion,
      sha256: accepted.sha256,
      version: baselineVersion,
    },
    authorityValidation: { status: "validated" },
    baselineDrift,
    boundary:
      "This report proves component-subpath export inventory correspondence only; root, primitives, utils, and code subpaths are out of scope. Name matches and reviewed classifications do not prove behavioral, accessibility, rendering, visual, interaction, SSR, or hydration parity.",
    claim: "component-subpath-export-inventory-correspondence",
    coverage: coverage.entries,
    evidenceAggregation: {
      reason:
        "Contract statuses and parity-proof evidence are intentionally not aggregated by this report; evidenceKey is the future join key.",
      sources: [],
      status: "not-run",
    },
    interpretation: {
      exactFacts:
        "Package versions, lock integrity, installed package manifest bytes, export subpaths, declaration names, and installed declaration bytes come directly from the checked authorities. Lock integrity provenance-attests the package resolution; this report does not independently reconstruct the registry tarball.",
      heuristic:
        "An identical family or declaration name is inventory correspondence only; investigate means a maintainer must determine whether a difference is a gap or an idiomatic framework adaptation.",
      reviewedClassifications:
        "Categories, reasons, and source paths are maintainer-authored review metadata pinned to the installed upstream version. This command validates their schema and declaration references; it does not machine-verify the source-review conclusions or behavioral parity.",
    },
    local: {
      name: authority.local.packageJson.name,
      packageJsonSha256: authority.local.packageJsonSha256,
      version: authority.local.packageJson.version,
    },
    mappingAuthority: {
      ...coverage.mappingAuthority,
      sha256: sha256(authority.mappings.source),
      status: mappingStatus,
    },
    releaseChanges,
    schemaVersion: 3,
    status,
    summary: coverage.summary,
    upstream: {
      authority: "installed package exports and published TypeScript declarations",
      lockIntegrity: authority.lock.integrity,
      lockPackageKey: authority.lock.packageKey,
      managedCheckoutTag: `@cloudflare/kumo@${authority.managedCheckoutVersion}`,
      name: authority.upstream.packageJson.name,
      packageJsonSha256: authority.upstream.packageJsonSha256,
      repository: normalizeRepository(authority.upstream.packageJson.repository),
      version: authority.installedVersion,
      workspaceSpecifier: authority.workspaceSpecifier,
    },
  };
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .filter((key) => value[key] !== undefined)
        .sort()
        .map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

export function serializeReport(report) {
  return `${JSON.stringify(canonicalize(report), null, 2)}\n`;
}

export function renderHumanReport(report) {
  const reviewedCategorySummary = Object.entries(report.summary.reviewedCategories)
    .filter(([, count]) => count > 0)
    .map(([category, count]) => `${count} ${category}`)
    .join(", ");
  const lines = [
    `Upstream Kumo authority gate: ${report.status.toUpperCase()}`,
    `Authority: ${report.upstream.name}@${report.upstream.version} installed package exports + TypeScript declarations`,
    `Provenance: ${report.upstream.lockPackageKey}; integrity ${report.upstream.lockIntegrity}; managed checkout ${report.upstream.managedCheckoutTag}`,
    `Accepted baseline: schema ${report.acceptedBaseline.schemaVersion}; ${report.upstream.name}@${report.acceptedBaseline.version}; sha256 ${report.acceptedBaseline.sha256}`,
    `Baseline drift: ${report.baselineDrift.status.toUpperCase()}`,
    `Mapping authority: ${report.mappingAuthority.status.toUpperCase()}; schema ${report.mappingAuthority.schemaVersion}; reviewed upstream ${report.mappingAuthority.reviewedUpstreamVersion}; sha256 ${report.mappingAuthority.sha256}`,
    "",
    `Families: ${report.summary.upstreamFamilies} upstream, ${report.summary.localFamilies} local`,
    `Classifications: ${report.summary.matched} matched, ${report.summary.investigate} investigate, ${report.summary["upstream-only"]} upstream-only, ${report.summary["local-only"]} local-only, ${report.summary["reviewed-difference"]} reviewed-difference`,
    `Reviewed upstream declarations: ${report.summary.reviewedDeclarations}${reviewedCategorySummary ? ` (${reviewedCategorySummary})` : ""}`,
    `Unaccounted upstream declarations: ${report.summary.investigateDeclarations}`,
  ];
  const findings = report.coverage.filter((entry) =>
    ["investigate", "upstream-only", "local-only"].includes(entry.classification),
  );
  if (findings.length > 0) {
    lines.push("", "Unexplained current inventory:");
    for (const entry of findings) {
      const family = entry.upstream?.family ?? entry.local.families.join(" + ");
      const names = entry.exportCorrespondence.investigate;
      lines.push(
        `- ${family} [${entry.classification}]${names.length > 0 ? `: ${names.join(", ")}` : ""}`,
      );
    }
  }
  if (report.baselineDrift.authorityChanges.length > 0) {
    lines.push("", "Authority drift:");
    for (const change of report.baselineDrift.authorityChanges) {
      lines.push(`- ${change.field}: ${change.from} -> ${change.to}`);
    }
  }
  if (report.baselineDrift.familyChanges.length > 0) {
    lines.push("", "Affected component families:");
    for (const change of report.baselineDrift.familyChanges) {
      const details =
        change.kind === "declaration-names-changed"
          ? ` (added: ${change.added.join(", ") || "none"}; removed: ${change.removed.join(", ") || "none"})`
          : change.kind === "declaration-content-changed"
            ? ` (digest ${change.fromDigest} -> ${change.toDigest}; stable names: ${change.stableDeclarationNames})`
            : "";
      lines.push(`- ${change.evidenceKey} [${change.kind}]${details}`);
    }
  }
  lines.push(
    "",
    `Release comparison${report.releaseChanges.source === "accepted-baseline" ? "" : " (advisory)"}: ${report.releaseChanges.status.toUpperCase()}${report.releaseChanges.reason ? ` — ${report.releaseChanges.reason}` : ""}`,
    `Evidence aggregation: ${report.evidenceAggregation.status.toUpperCase()} — ${report.evidenceAggregation.reason}`,
    "",
    `Interpretation: ${report.interpretation.heuristic}`,
    `Reviewed classifications: ${report.interpretation.reviewedClassifications}`,
    `Boundary: ${report.boundary}`,
  );
  return `${lines.join("\n")}\n`;
}

function parseArguments(argv) {
  const options = { json: false, previousPackagePath: undefined, updateBaseline: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--json") {
      options.json = true;
    } else if (argument === "--update-baseline") {
      options.updateBaseline = true;
    } else if (argument === "--previous-package") {
      options.previousPackagePath = argv[index + 1];
      if (!options.previousPackagePath) fail("usage", "--previous-package requires a path");
      index += 1;
    } else if (argument === "--help") {
      options.help = true;
    } else {
      fail("usage", `unknown argument: ${argument}`);
    }
  }
  if (options.updateBaseline && (options.json || options.previousPackagePath)) {
    fail("usage", "--update-baseline cannot be combined with report options");
  }
  return options;
}

function blockedReport(error) {
  return {
    error: { code: error.code ?? "unexpected-error", message: error.message },
    schemaVersion: 3,
    status: "blocked",
  };
}

async function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
    if (options.help) {
      process.stdout.write(
        "Usage: pnpm upstream:coverage [--json] [--previous-package <package-directory-or-package.json>]\n       pnpm upstream:baseline:update\n",
      );
      return;
    }
    if (options.updateBaseline) {
      const baseline = buildAcceptedBaseline();
      writeFileSync(defaultBaselinePath, serializeReport(baseline), "utf8");
      process.stdout.write(
        `Wrote deterministic machine facts for ${baseline.authority.package}@${baseline.authority.version} to ${relative(defaultRepoRoot, defaultBaselinePath)}. Git/PR review, not this command, accepts the baseline.\n`,
      );
      return;
    }
    const report = buildCoverageReport({ previousPackagePath: options.previousPackagePath });
    process.stdout.write(options.json ? serializeReport(report) : renderHumanReport(report));
    if (report.status !== "unchanged") process.exitCode = 1;
  } catch (error) {
    const blocked = blockedReport(error);
    if (options?.json) process.stdout.write(serializeReport(blocked));
    else
      process.stderr.write(`Upstream Kumo inventory coverage: BLOCKED\n${blocked.error.message}\n`);
    process.exitCode = 2;
  }
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))
) {
  await main();
}
