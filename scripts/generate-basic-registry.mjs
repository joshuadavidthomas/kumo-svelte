import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const registry = JSON.parse(
  fs.readFileSync("src/registry/component-registry.json", "utf8"),
);

const COMMON_PROP_DESCRIPTIONS = {
  "aria-label": "Accessible label for controls without visible text.",
  "aria-labelledby": "ID of the element that labels the control.",
  checked: "Controlled checked state.",
  children: "Content rendered inside the component.",
  class: "Additional CSS classes.",
  className: "Additional CSS classes.",
  container: "Portal container target.",
  defaultChecked: "Initial checked state for uncontrolled usage.",
  defaultOpen: "Initial open state for uncontrolled usage.",
  defaultValue: "Initial value for uncontrolled usage.",
  description: "Supporting description text or content.",
  disabled: "Whether the control is disabled.",
  error: "Validation error content.",
  href: "URL to navigate to.",
  icon: "Icon content rendered with the component.",
  id: "Element id.",
  items: "Items rendered by the component.",
  label: "Visible label text or content.",
  labelTooltip: "Tooltip content for the label.",
  loading: "Whether the component is in a loading state.",
  multiple: "Whether multiple values can be selected.",
  name: "Form field name.",
  onCheckedChange: "Callback fired when the checked state changes.",
  onClick: "Callback fired when the component is clicked.",
  onOpenChange: "Callback fired when the open state changes.",
  onValueChange: "Callback fired when the value changes.",
  open: "Controlled open state.",
  placeholder: "Placeholder text shown before a value is selected.",
  required: "Whether the form field is required.",
  sideOffset: "Distance in pixels from the trigger.",
  target: "Link target attribute.",
  text: "Primary text content.",
  title: "Title text or content.",
  value: "Controlled value.",
};

const PROP_DESCRIPTION_OVERRIDES = {
  action: "Action content rendered with the component.",
  align: "Alignment of the component content.",
  autocomplete: "Browser autocomplete attribute for the input.",
  autofocus: "Whether the control should receive focus automatically.",
  color: "Color option used by the component.",
  dir: "Text direction used by the underlying primitive.",
  external: "Whether the link points to an external destination.",
  forceMount: "Whether to keep the element mounted when it would otherwise be hidden.",
  hideLabel: "Whether to visually hide the label while keeping it available to assistive technology.",
  icon: "Icon content rendered with the component.",
  inset: "Whether to inset content to align with items that include an icon.",
  level: "Heading level used for the rendered title.",
  mode: "Selection mode used by the component.",
  readonly: "Whether the control is read-only.",
  ref: "Element or instance reference bound by the component.",
  role: "ARIA role used by the component.",
  shape: "Shape variant used by the component.",
  side: "Preferred side for positioned content.",
  size: "Size variant used by the component.",
  style: "Inline style string applied to the element.",
  to: "Portal target for rendered overlay content.",
  type: "Type option used by the component.",
  variant: "Visual style variant used by the component.",
};

const FALLBACK_COMPONENT_DESCRIPTIONS = {
  "components/chart": "Charts built on ECharts.",
  "components/date-range-picker": "Calendar date range picker for selecting start and end dates.",
  "components/field": "Form field wrapper for labels, descriptions, errors, and required state.",
  "components/surface": "LayerCard-backed surface wrapper for section backgrounds.",
};

const DEMO_SOURCE_COMPONENT_NAMES = {
  Dropdown: "DropdownMenu",
  Toast: "Toasty",
};

const docsDescriptions = readDocsDescriptions();
const docsContents = readDocsContents();
const demoExamples = readDemoExamples();

function pascal(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function readFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".svelte") || file.endsWith(".ts"))
    .map((file) => path.join(dir, file));
}

function readDocsDescriptions() {
  const docsRoot = "reference/cloudflare-kumo/packages/kumo-docs-astro/src/pages";
  const descriptions = { ...FALLBACK_COMPONENT_DESCRIPTIONS };

  if (!fs.existsSync(docsRoot)) return descriptions;

  for (const filePath of walkFiles(docsRoot)) {
    if (!filePath.endsWith(".mdx") && !filePath.endsWith(".astro")) continue;

    const source = fs.readFileSync(filePath, "utf8");
    const sourceFile =
      frontmatterValue(source, "sourceFile") ?? componentAttributeValue(source, "sourceFile");
    const description =
      frontmatterValue(source, "description") ?? componentAttributeValue(source, "description");

    if (sourceFile && description && !descriptions[sourceFile]) {
      descriptions[sourceFile] = description;
      if (!sourceFile.includes("/") && !descriptions[`components/${sourceFile}`]) {
        descriptions[`components/${sourceFile}`] = description;
      }
    }
  }

  return descriptions;
}

function readDocsContents() {
  const docsRoot = "reference/cloudflare-kumo/packages/kumo-docs-astro/src/pages";
  const contents = {};

  if (!fs.existsSync(docsRoot)) return contents;

  for (const filePath of walkFiles(docsRoot)) {
    if (!filePath.endsWith(".mdx") && !filePath.endsWith(".astro")) continue;

    const source = fs.readFileSync(filePath, "utf8");
    const sourceFile =
      frontmatterValue(source, "sourceFile") ?? componentAttributeValue(source, "sourceFile");

    if (sourceFile && !contents[sourceFile]) {
      contents[sourceFile] = source.trim();
      if (!sourceFile.includes("/") && !contents[`components/${sourceFile}`]) {
        contents[`components/${sourceFile}`] = source.trim();
      }
    }
  }

  return contents;
}

function readDemoExamples() {
  const demosRoot = "reference/cloudflare-kumo/packages/kumo-docs-astro/src/components/demos";
  const examples = {};

  if (!fs.existsSync(demosRoot)) return examples;

  for (const filePath of walkFiles(demosRoot)) {
    if (!filePath.endsWith("Demo.tsx")) continue;

    const source = fs.readFileSync(filePath, "utf8");
    const sourceFile = ts.createSourceFile(
      filePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );

    const demoName = path.basename(filePath, ".tsx").replace(/Demo$/, "");
    const sourceComponentName = DEMO_SOURCE_COMPONENT_NAMES[demoName] ?? demoName;
    examples[demoName] ??= [];

    ts.forEachChild(sourceFile, (node) => {
      if (!ts.isFunctionDeclaration(node) || !node.name || !node.body) return;
      const modifiers = ts.getModifiers(node) ?? [];
      if (!modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
        return;
      }

      for (const snippet of collectDemoSnippets(node.body, sourceFile, sourceComponentName)) {
        addExample(examples[demoName], snippet);
      }
    });
  }

  return examples;
}

function collectDemoSnippets(node, sourceFile, componentName) {
  const snippets = [];

  function visit(child, insideMatchedComponent = false) {
    if (ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child)) {
      const tagName = jsxTagName(child);
      const matches = tagName === componentName || tagName.startsWith(`${componentName}.`);

      if (matches && !insideMatchedComponent) {
        snippets.push(normalizeDemoSnippet(child.getText(sourceFile)));
        return;
      }

      ts.forEachChild(child, (grandchild) => visit(grandchild, insideMatchedComponent || matches));
      return;
    }

    ts.forEachChild(child, (grandchild) => visit(grandchild, insideMatchedComponent));
  }

  visit(node);
  return snippets;
}

function jsxTagName(node) {
  const tagName = ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName;
  return tagName.getText();
}

function normalizeDemoSnippet(source) {
  return source.replace(/\r\n/g, "\n").trim();
}

function addExample(examples, snippet) {
  if (!snippet || examples.includes(snippet)) return;
  if (snippet.length > 2000) return;
  if (examples.length >= 8) return;

  examples.push(snippet);
}

function walkFiles(dir) {
  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(entryPath));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

function frontmatterValue(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*"([^"]+)"`, "m"));
  return match?.[1];
}

function componentAttributeValue(source, key) {
  const match = source.match(new RegExp(`\\b${key}="([^"]+)"`));
  return match?.[1];
}

function collectProps(dir) {
  const props = {};
  const files = readFiles(dir);
  const sourceFiles = files.map((file) => ({
    file,
    source: fs.readFileSync(file, "utf8"),
  }));
  const declarations = collectTypeDeclarations(sourceFiles);

  for (const { file, source } of sourceFiles) {
    const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);

    ts.forEachChild(sourceFile, (node) => {
      if (!ts.isInterfaceDeclaration(node) || !node.name.text.endsWith("Props")) return;

      for (const member of node.members) {
        if (!ts.isPropertySignature(member) || !member.type) continue;

        const name = propName(member.name);
        if (!name) continue;

        const schema = {
          type: member.type.getText(sourceFile).replace(/\s+/g, " ").trim(),
          required: !member.questionToken,
        };
        const values = literalUnionValues(member.type);
        if (values) schema.values = values;
        const runtime =
          runtimeValidation(member.type, declarations) ??
          externalRuntimeValidation(schema.type, name);
        if (runtime) schema.runtime = runtime;
        const description = jsDocDescription(member);
        if (description) schema.description = description;

        props[name] = schema;
      }
    });
  }

  return props;
}

function collectTypeDeclarations(sourceFiles) {
  const declarations = new Map();

  for (const { file, source } of sourceFiles) {
    const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);

    ts.forEachChild(sourceFile, (node) => {
      if (
        (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
        ts.isIdentifier(node.name)
      ) {
        declarations.set(node.name.text, node);
      }
    });
  }

  return declarations;
}

function propName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }

  return undefined;
}

function jsDocDescription(node) {
  const jsDoc = ts.getJSDocCommentsAndTags(node).find(ts.isJSDoc);
  if (!jsDoc?.comment) return undefined;

  return Array.isArray(jsDoc.comment)
    ? jsDoc.comment.map((part) => part.text).join("").trim()
    : jsDoc.comment.trim();
}

function literalUnionValues(typeNode) {
  if (!ts.isUnionTypeNode(typeNode)) return undefined;

  const values = [];

  for (const type of typeNode.types) {
    if (!ts.isLiteralTypeNode(type) || !ts.isStringLiteral(type.literal)) {
      return undefined;
    }

    values.push(type.literal.text);
  }

  return values.length > 0 ? values : undefined;
}

function runtimeValidation(typeNode, declarations = new Map(), seen = new Set()) {
  if (ts.isParenthesizedTypeNode(typeNode)) return runtimeValidation(typeNode.type, declarations, seen);

  if (typeNode.kind === ts.SyntaxKind.StringKeyword) return { kind: "string" };
  if (typeNode.kind === ts.SyntaxKind.NumberKeyword) return { kind: "number" };
  if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) return { kind: "boolean" };
  if (typeNode.kind === ts.SyntaxKind.UnknownKeyword) return undefined;
  if (typeNode.kind === ts.SyntaxKind.AnyKeyword) return undefined;

  if (ts.isLiteralTypeNode(typeNode)) {
    const value = literalTypeValue(typeNode.literal);
    return value === undefined ? undefined : { kind: "literal", value };
  }

  if (ts.isArrayTypeNode(typeNode)) {
    return { kind: "array", item: runtimeValidation(typeNode.elementType, declarations, seen) };
  }

  if (ts.isTupleTypeNode(typeNode)) {
    return {
      kind: "array",
      items: typeNode.elements
        .map((element) => runtimeValidation(element, declarations, seen))
        .filter(Boolean),
    };
  }

  if (ts.isFunctionTypeNode(typeNode)) return { kind: "function" };

  if (ts.isTypeLiteralNode(typeNode)) {
    const props = {};

    for (const member of typeNode.members) {
      if (!ts.isPropertySignature(member) || !member.type) continue;

      const name = propName(member.name);
      if (!name) continue;

      const runtime = runtimeValidation(member.type, declarations, seen);
      if (runtime) {
        props[name] = {
          ...runtime,
          required: !member.questionToken,
        };
      }
    }

    return { kind: "object", ...(Object.keys(props).length > 0 ? { props } : {}) };
  }

  if (ts.isUnionTypeNode(typeNode)) {
    const options = typeNode.types
      .filter((type) => !isNilType(type))
      .map((type) => runtimeValidation(type, declarations, seen))
      .filter(Boolean);

    if (options.length === 0) return undefined;
    if (options.length === 1) return options[0];

    return { kind: "union", options };
  }

  if (ts.isIntersectionTypeNode(typeNode)) {
    const parts = typeNode.types
      .map((type) => runtimeValidation(type, declarations, seen))
      .filter(Boolean);
    if (parts.length === 0) return undefined;
    if (parts.every((part) => part.kind === "object")) {
      return { kind: "object" };
    }
    return undefined;
  }

  if (ts.isTypeReferenceNode(typeNode)) {
    const name = typeNode.typeName.getText();

    if (name === "Array" || name === "ReadonlyArray") {
      return {
        kind: "array",
        item: typeNode.typeArguments?.[0]
          ? runtimeValidation(typeNode.typeArguments[0], declarations, seen)
          : undefined,
      };
    }

    if (name === "Record") {
      return {
        kind: "record",
        item: typeNode.typeArguments?.[1]
          ? runtimeValidation(typeNode.typeArguments[1], declarations, seen)
          : undefined,
      };
    }

    if (name === "Snippet") return { kind: "snippet" };
    if (name === "Partial") return { kind: "object" };
    if (name === "Omit" || name === "Pick") return { kind: "object" };

    const declaration = declarations.get(name);
    if (declaration && !seen.has(name)) {
      const nextSeen = new Set(seen);
      nextSeen.add(name);

      if (ts.isTypeAliasDeclaration(declaration)) {
        return runtimeValidation(declaration.type, declarations, nextSeen);
      }

      if (ts.isInterfaceDeclaration(declaration)) {
        return runtimeObjectValidation(declaration.members, declarations, nextSeen);
      }
    }
  }

  return undefined;
}

function runtimeObjectValidation(members, declarations, seen) {
  const props = {};

  for (const member of members) {
    if (!ts.isPropertySignature(member) || !member.type) continue;

    const name = propName(member.name);
    if (!name) continue;

    const runtime = runtimeValidation(member.type, declarations, seen);
    if (runtime) {
      props[name] = {
        ...runtime,
        required: !member.questionToken,
      };
    }
  }

  return { kind: "object", ...(Object.keys(props).length > 0 ? { props } : {}) };
}

function externalRuntimeValidation(type, name) {
  const normalized = type.replace(/\s+/g, " ").trim();
  const withoutNil = normalized
    .split("|")
    .map((part) => part.trim())
    .filter((part) => part !== "null" && part !== "undefined")
    .join(" | ");

  if (withoutNil !== normalized) return externalRuntimeValidation(withoutNil, name);

  if (normalized === 'HTMLInputAttributes["autocomplete"]') return { kind: "string" };
  if (normalized.startsWith("Intl.DateTimeFormatOptions[")) return { kind: "string" };
  if (normalized === "keyof HTMLElementTagNameMap") return { kind: "string" };
  if (/^Kumo[A-Za-z0-9]+(Size|Variant|Side|Role|Color|Gap|Layout|Appearance)$/.test(normalized)) {
    return { kind: "string" };
  }
  if (normalized === "KumoTooltipSide") return { kind: "string" };
  if (normalized === 'PortalProps["to"]') {
    return {
      kind: "union",
      options: [{ kind: "string" }, { kind: "object" }],
    };
  }
  if (normalized === "DateMatcher") {
    return {
      kind: "union",
      options: [{ kind: "boolean" }, { kind: "function" }, { kind: "array" }, { kind: "object" }],
    };
  }
  if (normalized === "Action<HTMLElement>") return { kind: "function" };
  if (normalized === "HTMLElement" || /^HTML[A-Za-z]+Element$/.test(normalized)) {
    return { kind: "object" };
  }
  if (
    normalized === "DateValue" ||
    normalized === "DateRange" ||
    normalized === "KumoChartOption" ||
    normalized === "NormalizedFieldError" ||
    normalized === "SetOptionOpts" ||
    normalized === "typeof echarts" ||
    normalized === "echarts.ECharts"
  ) {
    return { kind: "object" };
  }

  if (name === "ref" && /Element|ECharts/.test(normalized)) return { kind: "object" };

  return undefined;
}

function literalTypeValue(literal) {
  if (ts.isStringLiteral(literal)) return literal.text;
  if (ts.isNumericLiteral(literal)) return Number(literal.text);
  if (literal.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (literal.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
}

function isNilType(typeNode) {
  return (
    typeNode.kind === ts.SyntaxKind.UndefinedKeyword ||
    (ts.isLiteralTypeNode(typeNode) && typeNode.literal.kind === ts.SyntaxKind.NullKeyword)
  );
}

function readVariantMetadata(dir) {
  const variantsPath = path.join(dir, "variants.ts");
  if (!fs.existsSync(variantsPath)) return {};

  const source = fs.readFileSync(variantsPath, "utf8");
  const sourceFile = ts.createSourceFile(variantsPath, source, ts.ScriptTarget.Latest, true);
  const metadata = {};

  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isVariableStatement(node)) return;

    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;

      const name = declaration.name.text;
      if (!/^KUMO_[A-Z0-9_]+_(BASE_STYLES|DEFAULT_VARIANTS|STYLING|VARIANTS)$/.test(name)) {
        continue;
      }

      const value = literalValue(declaration.initializer);
      if (value === undefined) continue;

      if (name.endsWith("_BASE_STYLES")) metadata.baseStyles = value;
      if (name.endsWith("_VARIANTS") && !name.endsWith("_DEFAULT_VARIANTS")) {
        metadata.variants = value;
      }
      if (name.endsWith("_DEFAULT_VARIANTS")) metadata.defaultVariants = value;
      if (name.endsWith("_STYLING")) metadata.styling = value;
    }
  });

  return metadata;
}

function literalValue(node) {
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return literalValue(node.expression);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)) {
    const value = Number(node.operand.text);
    return node.operator === ts.SyntaxKind.MinusToken ? -value : value;
  }
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literalValue);

  if (ts.isObjectLiteralExpression(node)) {
    const value = {};
    let assignedProperties = 0;

    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;

      const name = propName(property.name);
      if (!name) continue;

      const propertyValue = literalValue(property.initializer);
      if (propertyValue !== undefined) {
        value[name] = propertyValue;
        assignedProperties++;
      }
    }

    return node.properties.length === 0 || assignedProperties > 0 ? value : undefined;
  }

  return undefined;
}

function variantOptionEntries(group) {
  if (Array.isArray(group)) {
    return group.map((value) => [value, {}]);
  }

  if (!group || typeof group !== "object") return [];

  return Object.entries(group);
}

function normalizeVariantGroups(variants) {
  if (!variants || typeof variants !== "object") return undefined;

  const groups = {};

  for (const [name, group] of Object.entries(variants)) {
    const entries = variantOptionEntries(group);
    if (entries.length === 0) continue;

    const values = [];
    const classes = {};
    const descriptions = {};

    for (const [value, metadata] of entries) {
      values.push(value);

      if (metadata && typeof metadata === "object") {
        if (typeof metadata.classes === "string") classes[value] = metadata.classes;
        if (typeof metadata.description === "string") {
          descriptions[value] = metadata.description;
        }
      }
    }

    groups[name] = {
      values,
      ...(Object.keys(classes).length > 0 ? { classes } : {}),
      ...(Object.keys(descriptions).length > 0 ? { descriptions } : {}),
    };
  }

  return Object.keys(groups).length > 0 ? groups : undefined;
}

function applyVariantMetadata(schema, metadata) {
  const variantGroups = normalizeVariantGroups(metadata.variants);

  if (metadata.baseStyles) schema.baseStyles = metadata.baseStyles;

  if (variantGroups || metadata.defaultVariants || metadata.styling) {
    schema.styling = {
      ...(metadata.styling ?? {}),
      ...(variantGroups ? { variants: variantGroups } : {}),
      ...(metadata.defaultVariants ? { defaultVariants: metadata.defaultVariants } : {}),
    };
  }

  if (!variantGroups) return;

  for (const [name, group] of Object.entries(variantGroups)) {
    if (!schema.props[name]) continue;

    schema.props[name] = {
      ...schema.props[name],
      ...(metadata.defaultVariants?.[name] ? { default: metadata.defaultVariants[name] } : {}),
      ...(group.classes ? { classes: group.classes } : {}),
      ...(group.descriptions ? { descriptions: group.descriptions } : {}),
      values: group.values,
    };
  }
}

function applyCommonPropDescriptions(schema) {
  for (const [name, prop] of Object.entries(schema.props)) {
    if (!prop.description && COMMON_PROP_DESCRIPTIONS[name]) {
      prop.description = COMMON_PROP_DESCRIPTIONS[name];
    }
  }
}

function applyGeneratedPropDescriptions(schema) {
  for (const [name, prop] of Object.entries(schema.props)) {
    if (!prop.description) {
      prop.description = generatedPropDescription(name, prop.type);
    }
  }
}

function generatedPropDescription(name, type) {
  if (PROP_DESCRIPTION_OVERRIDES[name]) return PROP_DESCRIPTION_OVERRIDES[name];

  const label = humanizePropName(name);

  if (name.startsWith("default")) return `Initial ${label.replace(/^default /, "")} value.`;
  if (name.startsWith("on") && type.includes("=>")) {
    return `Callback fired when ${humanizePropName(name.slice(2))} occurs.`;
  }
  if (name.startsWith("is")) return `Whether ${label.replace(/^is /, "")} is enabled.`;
  if (name.startsWith("show")) return `Whether to show ${label.replace(/^show /, "")}.`;
  if (name.startsWith("disable")) return `Whether to disable ${label.replace(/^disable /, "")}.`;
  if (name.startsWith("prevent")) return `Whether to prevent ${label.replace(/^prevent /, "")}.`;
  if (name.startsWith("allow")) return `Whether to allow ${label.replace(/^allow /, "")}.`;
  if (name.startsWith("render") || type.includes("Snippet")) {
    return `Custom content or renderer for ${label}.`;
  }
  if (type.includes("=>")) return `Function used for ${label}.`;
  if (type.endsWith("[]") || type.startsWith("ReadonlyArray<")) return `List of ${label}.`;
  if (type.startsWith("Record<")) return `Mapping of ${label}.`;
  if (type === "boolean") return `Whether ${label} is enabled.`;
  if (type === "number") return `Numeric ${label} value.`;

  return `${capitalize(label)} value.`;
}

function humanizePropName(name) {
  return name
    .replace(/^aria-/, "ARIA ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function applyDocsDescription(schema, sourceFile) {
  if (docsDescriptions[sourceFile]) schema.description = docsDescriptions[sourceFile];
}

function applyDocsContent(schema, sourceFile) {
  if (docsContents[sourceFile]) schema.upstreamDocs = docsContents[sourceFile];
}

function runtimePropSchemas(registry) {
  const schemas = {};

  for (const schema of [
    ...Object.values(registry.components),
    ...Object.values(registry.blocks ?? {}),
  ]) {
    schemas[schema.name] = Object.fromEntries(
      Object.entries(schema.props).map(([name, prop]) => [
        name,
        {
          type: prop.type,
          ...(prop.values ? { values: prop.values } : {}),
          ...(prop.runtime ? { runtime: prop.runtime } : {}),
        },
      ]),
    );
  }

  return schemas;
}

function applyGeneratedExamples(schema) {
  if (schema.examples?.length > 0) return;

  const variantProps = Object.entries(schema.props).filter(([, prop]) => prop.values?.length > 0);
  const variantProp = variantProps.find(([name]) => name === "variant") ?? variantProps[0];
  if (!variantProp) return;

  const [propName, prop] = variantProp;
  const hasChildren = "children" in schema.props;

  schema.examples = prop.values.slice(0, 4).map((value) => {
    const props = `${propName}=${formatExampleValue(value)}`;

    if (hasChildren) {
      return `<${schema.name} ${props}>${schema.name}</${schema.name}>`;
    }

    return `<${schema.name} ${props} />`;
  });
}

function applyDemoExamples(schema, demoNames) {
  schema.upstreamExamples = [];

  for (const demoName of demoNames) {
    for (const example of demoExamples[demoName] ?? []) {
      addExample(schema.upstreamExamples, example);
    }
  }

  if (schema.upstreamExamples.length === 0) delete schema.upstreamExamples;
}

function demoNamesForSchema(name) {
  const aliases = {
    Code: ["CodeHighlighted"],
    Dropdown: ["Dropdown"],
    Input: ["Input", "InputArea"],
    Loader: ["Loader", "SkeletonLine"],
    Menubar: ["MenuBar"],
  };

  return [...new Set([name, ...(aliases[name] ?? [])])];
}

function formatExampleValue(value) {
  return typeof value === "number" ? `{${value}}` : `"${value}"`;
}

for (const key of Object.keys(pkg.exports).filter((entry) =>
  entry.startsWith("./components/"),
)) {
  const slug = key.replace("./components/", "");
  const name = pascal(slug);
  if (registry.components[name]) {
    const dir = path.join("src/components", slug);
    registry.components[name].props = collectProps(dir);
    delete registry.components[name].baseStyles;
    delete registry.components[name].styling;
    delete registry.components[name].upstreamDocs;
    delete registry.components[name].upstreamExamples;
    applyDocsDescription(registry.components[name], `components/${slug}`);
    applyDocsContent(registry.components[name], `components/${slug}`);
    applyVariantMetadata(registry.components[name], readVariantMetadata(dir));
    applyCommonPropDescriptions(registry.components[name]);
    applyGeneratedPropDescriptions(registry.components[name]);
    registry.components[name].examples = [];
    applyGeneratedExamples(registry.components[name]);
    applyDemoExamples(registry.components[name], demoNamesForSchema(name));
  }
}

for (const key of Object.keys(pkg.exports).filter((entry) =>
  entry.startsWith("./blocks/"),
)) {
  const slug = key.replace("./blocks/", "");
  const name = pascal(slug);
  if (registry.blocks[name]) {
    const dir = path.join("src/blocks", slug);
    registry.blocks[name].props = collectProps(dir);
    delete registry.blocks[name].baseStyles;
    delete registry.blocks[name].styling;
    delete registry.blocks[name].upstreamDocs;
    delete registry.blocks[name].upstreamExamples;
    applyDocsDescription(registry.blocks[name], `blocks/${slug}`);
    applyDocsContent(registry.blocks[name], `blocks/${slug}`);
    applyVariantMetadata(registry.blocks[name], readVariantMetadata(dir));
    applyCommonPropDescriptions(registry.blocks[name]);
    applyGeneratedPropDescriptions(registry.blocks[name]);
    registry.blocks[name].examples = [];
    applyGeneratedExamples(registry.blocks[name]);
    applyDemoExamples(registry.blocks[name], demoNamesForSchema(name));
  }
}

fs.writeFileSync(
  "src/registry/component-registry.json",
  `${JSON.stringify(registry, null, 2)}\n`,
);
fs.copyFileSync(
  "src/registry/component-registry.json",
  "src/ai/component-registry.json",
);

fs.writeFileSync(
  "src/ai/component-props.ts",
  `// Generated by scripts/generate-basic-registry.mjs.\nexport const KUMO_COMPONENT_PROP_SCHEMAS = ${JSON.stringify(runtimePropSchemas(registry), null, 2)} as const;\n`,
);
