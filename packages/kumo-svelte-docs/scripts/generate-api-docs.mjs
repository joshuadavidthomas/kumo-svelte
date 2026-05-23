import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "../..");
const componentsRoot = join(packageRoot, "kumo-svelte/src/components");
const outputPath = join(__dirname, "../src/lib/generated/api-docs.ts");

const genericAliases = new Set([
  "Root",
  "Trigger",
  "TriggerValue",
  "TriggerInput",
  "TriggerMultipleWithInput",
  "Value",
  "Viewport",
  "Content",
  "Portal",
  "Overlay",
  "Title",
  "Description",
  "Header",
  "Footer",
  "Close",
  "Item",
  "CheckboxItem",
  "RadioItem",
  "LinkItem",
  "List",
  "Input",
  "InputGroup",
  "Group",
  "CheckboxGroup",
  "RadioGroup",
  "GroupContent",
  "GroupLabel",
  "GroupHeading",
  "Separator",
  "Label",
  "Shortcut",
  "Sub",
  "SubTrigger",
  "SubContent",
  "Empty",
  "Loading",
  "Chip",
  "Legend",
  "Current",
  "Link",
  "Ellipsis",
  "Clipboard",
  "Panel",
  "DefaultPanel",
  "DefaultTrigger",
  "Provider",
  "Control",
  "Controls",
  "Connectors",
  "Dialog",
  "Info",
  "PageSize",
  "Addon",
  "Button",
  "Collapsible",
  "CollapsibleContent",
  "CollapsibleTrigger",
  "Suffix",
  "Primary",
  "Secondary",
  "ResultItem",
  "Node",
  "Parallel",
  "Anchor",
  "Menu",
  "MenuAction",
  "MenuBadge",
  "MenuButton",
  "MenuChevron",
  "MenuItem",
  "MenuSub",
  "MenuSubButton",
  "MenuSubItem",
  "Rail",
  "Section",
  "CheckHead",
  "CheckCell",
  "Head",
  "Cell",
  "Row",
  "Body",
  "Footer",
  "ResizeHandle",
]);

function pascalCase(value) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function extractScript(source) {
  const match = source.match(/<script\s+lang="ts">([\s\S]*?)<\/script>/);
  return match?.[1] ?? "";
}

function sourceFileForScript(path, script) {
  return ts.createSourceFile(
    path.replace(/\.svelte$/, ".ts"),
    script,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
}

function parseIndexAliases(dirPath) {
  const indexPath = join(dirPath, "index.ts");
  const aliasesBySource = new Map();

  let source;
  try {
    source = readFileSync(indexPath, "utf8");
  } catch {
    return aliasesBySource;
  }

  const importedSources = new Map();
  const sourceFile = ts.createSourceFile(
    indexPath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement) && statement.importClause?.name) {
      const specifier = statement.moduleSpecifier.text;
      if (specifier.endsWith(".svelte") || !specifier.includes("/")) {
        importedSources.set(statement.importClause.name.text, normalizeSvelteSpecifier(specifier));
      }
    }
  }

  for (const statement of sourceFile.statements) {
    if (
      !ts.isExportDeclaration(statement) ||
      !statement.exportClause ||
      !ts.isNamedExports(statement.exportClause)
    ) {
      continue;
    }

    const moduleSource =
      statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
        ? normalizeSvelteSpecifier(statement.moduleSpecifier.text)
        : null;

    for (const element of statement.exportClause.elements) {
      const alias = element.name.text;
      const local = element.propertyName?.text ?? element.name.text;
      const sourceName = moduleSource ?? importedSources.get(local);

      if (!sourceName) continue;
      if (!aliasesBySource.has(sourceName)) aliasesBySource.set(sourceName, []);
      aliasesBySource.get(sourceName).push(alias);
    }
  }

  return aliasesBySource;
}

function normalizeSvelteSpecifier(specifier) {
  return specifier.endsWith(".svelte")
    ? specifier.replace(/^\.\//, "")
    : `${specifier.replace(/^\.\//, "")}.svelte`;
}

function rootFamilyForAliases(dirPath, aliasesBySource) {
  const directoryFamily = pascalCase(basename(dirPath));
  const candidates = [];

  for (const aliases of aliasesBySource.values()) {
    if (!aliases.includes("Root")) continue;

    for (const alias of aliases) {
      if (!/^[A-Z]/.test(alias) || genericAliases.has(alias)) continue;
      candidates.push(alias.endsWith("Root") ? alias.slice(0, -"Root".length) : alias);
    }
  }

  if (candidates.includes(directoryFamily)) return directoryFamily;
  return candidates.sort((a, b) => a.length - b.length)[0];
}

function displayNamesForAliases(aliases, fallbackName, rootFamily) {
  const uniqueAliases = [...new Set(aliases)].filter((alias) => /^[A-Z]/.test(alias));
  if (uniqueAliases.length === 0) return [fallbackName];

  const generic = uniqueAliases.filter((alias) => genericAliases.has(alias));
  const nonGeneric = uniqueAliases.filter((alias) => !genericAliases.has(alias));

  if (generic.length === 0) {
    return nonGeneric.length > 0 ? nonGeneric : uniqueAliases;
  }

  if (rootFamily) {
    if (generic.includes("Root") && uniqueAliases.includes(rootFamily)) {
      return [rootFamily];
    }

    const rootFamilyPart = generic.find((part) => uniqueAliases.includes(`${rootFamily}${part}`));
    if (rootFamilyPart) {
      return [`${rootFamily}.${rootFamilyPart}`];
    }
  }

  if (nonGeneric.length === 0) {
    return [fallbackName];
  }

  const familyCandidates = [];
  for (const alias of nonGeneric) {
    for (const part of generic) {
      if (part === "Root") {
        if (alias.endsWith("Root") && alias.length > "Root".length) {
          familyCandidates.push(alias.slice(0, -"Root".length));
        }
        continue;
      }

      if (alias.endsWith(part) && alias.length > part.length) {
        familyCandidates.push(alias.slice(0, -part.length));
      }
    }
  }

  for (const part of generic) {
    if (part !== "Root" && fallbackName.endsWith(part) && fallbackName.length > part.length) {
      familyCandidates.push(fallbackName.slice(0, -part.length));
    }
  }

  const family =
    familyCandidates.sort((a, b) => a.length - b.length)[0] ??
    nonGeneric.find((alias) => !alias.endsWith("Root")) ??
    fallbackName;
  const preferredPart = generic.includes("Root")
    ? "Root"
    : (generic.find((part) => part !== family) ?? generic[0]);
  const preferredName = preferredPart === "Root" ? family : `${family}.${preferredPart}`;

  const extraNames = nonGeneric.filter((alias) => {
    const isFamilyAlias = alias === family || alias === `${family}Root`;
    const isPrefixedSubComponent = generic.some(
      (part) => part !== "Root" && alias === `${family}${part}`,
    );
    return !isFamilyAlias && !isPrefixedSubComponent;
  });

  return [...new Set([preferredName, ...extraNames])];
}

function readDefaults(sourceFile, propsName) {
  const defaults = new Map();

  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name)) {
      const annotation = node.type?.getText(sourceFile);
      if (annotation === propsName) {
        for (const element of node.name.elements) {
          if (!ts.isBindingElement(element) || !ts.isIdentifier(element.name)) continue;
          if (!element.initializer) continue;
          defaults.set(element.name.text, formatDefault(element.initializer.getText(sourceFile)));
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return defaults;
}

function formatDefault(value) {
  const bindable = value.match(/^\$bindable\((.*)\)$/s);
  if (bindable) {
    return bindable[1].trim() || "bindable";
  }
  return value;
}

function jsDocDescription(node) {
  return node.jsDoc?.at(-1)?.comment ? String(node.jsDoc.at(-1).comment) : undefined;
}

function jsDocTag(node, tagName) {
  const tag = node.jsDoc?.at(-1)?.tags?.find((tag) => tag.tagName.getText() === tagName);
  return tag?.comment ? String(tag.comment) : undefined;
}

function propsFromMembers(sourceFile, propsName, members, defaultsSourceFile = sourceFile) {
  const defaults = readDefaults(defaultsSourceFile, propsName);

  return members.filter(ts.isPropertySignature).map((member) => {
    const name = member.name.getText(sourceFile).replace(/^['"]|['"]$/g, "");
    const type = jsDocTag(member, "displayType") ?? member.type?.getText(sourceFile) ?? "unknown";
    const defaultValue = jsDocTag(member, "default") ?? defaults.get(name);

    return {
      name,
      type,
      required: !member.questionToken,
      default: defaultValue,
      description: jsDocDescription(member),
    };
  });
}

function propsFromDeclaration(sourceFile, declaration, defaultsSourceFile = sourceFile) {
  if (ts.isInterfaceDeclaration(declaration)) {
    return propsFromMembers(
      sourceFile,
      declaration.name.text,
      [...declaration.members],
      defaultsSourceFile,
    );
  }

  if (ts.isTypeAliasDeclaration(declaration)) {
    return propsFromMembers(
      sourceFile,
      declaration.name.text,
      typeLiteralMembers(declaration.type),
      defaultsSourceFile,
    );
  }

  return [];
}

function typeLiteralMembers(node) {
  if (ts.isTypeLiteralNode(node)) {
    return [...node.members];
  }

  if (ts.isIntersectionTypeNode(node)) {
    return node.types.flatMap(typeLiteralMembers);
  }

  return [];
}

function importedPropDeclarations(sourceFile, dirPath) {
  const declarations = [];

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !statement.importClause?.namedBindings) continue;
    if (!ts.isNamedImports(statement.importClause.namedBindings)) continue;
    if (!ts.isStringLiteral(statement.moduleSpecifier)) continue;

    const specifier = statement.moduleSpecifier.text;
    if (!specifier.startsWith(".")) continue;

    const importedNames = statement.importClause.namedBindings.elements
      .filter((element) => element.isTypeOnly || statement.importClause?.isTypeOnly)
      .map((element) => element.name.text)
      .filter((name) => name.endsWith("Props"));
    if (importedNames.length === 0) continue;

    const importedPath = join(dirPath, `${specifier.replace(/^\.\//, "")}.ts`);
    let importedSource;
    try {
      importedSource = sourceFileForScript(importedPath, readFileSync(importedPath, "utf8"));
    } catch {
      continue;
    }

    for (const declaration of importedSource.statements) {
      if (
        (ts.isInterfaceDeclaration(declaration) || ts.isTypeAliasDeclaration(declaration)) &&
        importedNames.includes(declaration.name.text)
      ) {
        declarations.push({ declaration, sourceFile: importedSource });
      }
    }
  }

  return declarations;
}

function componentDocsForFile(dirPath, fileName, aliasesBySource, rootFamily) {
  const path = join(dirPath, fileName);
  const script = extractScript(readFileSync(path, "utf8"));
  if (!script) return [];

  const sourceFile = sourceFileForScript(path, script);
  const localDeclarations = sourceFile.statements
    .filter(
      (statement) =>
        (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) &&
        statement.name.text.endsWith("Props"),
    )
    .map((declaration) => ({ declaration, sourceFile }));
  const declarations = [...localDeclarations, ...importedPropDeclarations(sourceFile, dirPath)];

  return declarations.flatMap(({ declaration, sourceFile: declarationSourceFile }) => {
    const propsBaseName = declaration.name.text.replace(/Props$/, "");
    const aliases = aliasesBySource.get(fileName) ?? [];
    const displayNames = displayNamesForAliases(aliases, propsBaseName, rootFamily);
    const props = propsFromDeclaration(declarationSourceFile, declaration, sourceFile);

    return displayNames.map((name) => ({
      name,
      family: name.split(".")[0],
      source: relative(packageRoot, path),
      description: jsDocDescription(declaration),
      props,
    }));
  });
}

function componentDocsForDirectory(dirPath) {
  const aliasesBySource = parseIndexAliases(dirPath);
  const rootFamily = rootFamilyForAliases(dirPath, aliasesBySource);
  const svelteFiles = readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith(".svelte"))
    .sort();

  return svelteFiles.flatMap((fileName) =>
    componentDocsForFile(dirPath, fileName, aliasesBySource, rootFamily),
  );
}

function generateApiDocs() {
  const entries = [];
  const dirNames = readdirSync(componentsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const dirName of dirNames) {
    entries.push(...componentDocsForDirectory(join(componentsRoot, dirName)));
  }

  const byName = new Map();
  for (const entry of entries) {
    const existing = byName.get(entry.name);
    if (!existing || entry.props.length > existing.props.length) {
      byName.set(entry.name, entry);
    }
  }

  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}

const apiDocs = generateApiDocs();
const content = `// Generated by packages/kumo-svelte-docs/scripts/generate-api-docs.mjs. Do not edit by hand.\n\nexport interface ApiPropDoc {\n  name: string;\n  type: string;\n  required: boolean;\n  default?: string;\n  description?: string;\n}\n\nexport interface ApiComponentDoc {\n  name: string;\n  family: string;\n  source: string;\n  description?: string;\n  props: ApiPropDoc[];\n}\n\nexport const apiDocs: ApiComponentDoc[] = ${JSON.stringify(apiDocs, null, 2)};\n`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, content);
console.log(
  `Generated ${apiDocs.length} API doc entries at ${relative(process.cwd(), outputPath)}`,
);
