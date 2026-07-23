import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import ts from "typescript";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const defaultRepoRoot = resolve(scriptDirectory, "..");
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

function assertKeys(value, allowed, label) {
  const unexpected = Object.keys(value).filter((key) => !allowed.includes(key));
  if (unexpected.length > 0) {
    fail("malformed-mappings", `${label} has unknown keys: ${unexpected.sort().join(", ")}`);
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

  return { specifier: fields.specifier, version };
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
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.d.ts`,
    join(base, "index.ts"),
    join(base, "index.d.ts"),
  ];
  const matches = candidates.filter(
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
    fail("malformed-declarations", "TypeScript could not parse a component declaration barrel");
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
      const target = resolveRelativeModule(canonicalPath, statement.moduleSpecifier.text);
      names.push(...parseDeclaredExports(target, visited));
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

  return sortedUnique(names);
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

export function readFamilyInventory(packageRoot, packageJson, authority) {
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
    const declarations = parseDeclaredExports(typesPath);
    if (declarations.length === 0) {
      fail("empty-inventory", `${authority} ${exportPath} has no declared exports`);
    }
    entries.push({ declarations, exportPath, family: match[1] });
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
    status: "passed",
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

export function buildCoverageReport(options = {}) {
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
  const localInventory = readFamilyInventory(local.packageRoot, local.packageJson, "local");
  const mappings = readJson(mappingsPath, "upstream coverage mappings");
  const coverage = classifyCoverage(
    upstreamInventory,
    localInventory,
    mappings.value,
    installedVersion,
    { repoRoot },
  );

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
      upstreamInventory,
      previous.packageJson.version,
      installedVersion,
    );
  } else {
    releaseChanges = {
      fromVersion: null,
      reason:
        "No previous authoritative package installation or recorded inventory is configured; changelog prose is not treated as an export authority.",
      status: "not-run",
      toVersion: installedVersion,
    };
  }

  return {
    authorityValidation: { status: "passed" },
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
        "Package versions, export subpaths, declaration names, and exact-name set differences come directly from the checked authorities.",
      heuristic:
        "An identical family or declaration name is inventory correspondence only; investigate means a maintainer must determine whether a difference is a gap or an idiomatic framework adaptation.",
      reviewedClassifications:
        "Categories, reasons, and source paths are maintainer-authored review metadata pinned to the installed upstream version. This command validates their schema and declaration references; it does not machine-verify the source-review conclusions or behavioral parity.",
    },
    local: {
      name: local.packageJson.name,
      packageJsonSha256: local.packageJsonSha256,
      version: local.packageJson.version,
    },
    mappingAuthority: {
      ...coverage.mappingAuthority,
      sha256: sha256(mappings.source),
      status: "passed",
    },
    releaseChanges,
    schemaVersion: 2,
    status: coverage.status,
    summary: coverage.summary,
    upstream: {
      authority: "installed package exports and published TypeScript declarations",
      managedCheckoutTag: `@cloudflare/kumo@${managedCheckoutVersion}`,
      name: upstream.packageJson.name,
      packageJsonSha256: upstream.packageJsonSha256,
      repository: normalizeRepository(upstream.packageJson.repository),
      version: installedVersion,
      workspaceSpecifier,
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
    `Upstream Kumo inventory coverage: ${report.status.toUpperCase()}`,
    `Authority: ${report.upstream.name}@${report.upstream.version} installed package exports + TypeScript declarations`,
    `Provenance: lockfile ${report.upstream.version}; managed checkout ${report.upstream.managedCheckoutTag}`,
    `Mapping authority: schema ${report.mappingAuthority.schemaVersion}; reviewed upstream ${report.mappingAuthority.reviewedUpstreamVersion}; sha256 ${report.mappingAuthority.sha256}`,
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
    lines.push("", "Requires investigation:");
    for (const entry of findings) {
      const family = entry.upstream?.family ?? entry.local.families.join(" + ");
      const names = entry.exportCorrespondence.investigate;
      lines.push(
        `- ${family} [${entry.classification}]${names.length > 0 ? `: ${names.join(", ")}` : ""}`,
      );
    }
  }
  lines.push(
    "",
    `Release changes: ${report.releaseChanges.status.toUpperCase()}${report.releaseChanges.reason ? ` — ${report.releaseChanges.reason}` : ""}`,
    `Evidence aggregation: ${report.evidenceAggregation.status.toUpperCase()} — ${report.evidenceAggregation.reason}`,
    "",
    `Interpretation: ${report.interpretation.heuristic}`,
    `Reviewed classifications: ${report.interpretation.reviewedClassifications}`,
    `Boundary: ${report.boundary}`,
  );
  return `${lines.join("\n")}\n`;
}

function parseArguments(argv) {
  const options = { json: false, previousPackagePath: undefined };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--json") {
      options.json = true;
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
  return options;
}

function blockedReport(error) {
  return {
    error: { code: error.code ?? "unexpected-error", message: error.message },
    schemaVersion: 2,
    status: "blocked",
  };
}

async function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
    if (options.help) {
      process.stdout.write(
        "Usage: pnpm upstream:coverage [--json] [--previous-package <package-directory-or-package.json>]\n",
      );
      return;
    }
    const report = buildCoverageReport({ previousPackagePath: options.previousPackagePath });
    process.stdout.write(options.json ? serializeReport(report) : renderHumanReport(report));
    if (report.status !== "passed") process.exitCode = 1;
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
