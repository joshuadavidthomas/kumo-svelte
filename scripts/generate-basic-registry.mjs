import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const registry = JSON.parse(
  fs.readFileSync("src/registry/component-registry.json", "utf8"),
);

const COMMON_PROP_DESCRIPTIONS = {
  "aria-label": "Accessible label for controls without visible text.",
  checked: "Controlled checked state.",
  children: "Content rendered inside the component.",
  class: "Additional CSS classes.",
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

function collectProps(dir) {
  const props = {};

  for (const file of readFiles(dir)) {
    const source = fs.readFileSync(file, "utf8");
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
        const description = jsDocDescription(member);
        if (description) schema.description = description;

        props[name] = schema;
      }
    });
  }

  return props;
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
        },
      ]),
    );
  }

  return schemas;
}

function applyGeneratedExamples(schema) {
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
    applyVariantMetadata(registry.components[name], readVariantMetadata(dir));
    applyCommonPropDescriptions(registry.components[name]);
    applyGeneratedExamples(registry.components[name]);
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
    applyVariantMetadata(registry.blocks[name], readVariantMetadata(dir));
    applyCommonPropDescriptions(registry.blocks[name]);
    applyGeneratedExamples(registry.blocks[name]);
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
