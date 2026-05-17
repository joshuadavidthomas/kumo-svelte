import fs from "node:fs";
import path from "node:path";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const registry = JSON.parse(
  fs.readFileSync("src/registry/component-registry.json", "utf8"),
);

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

function findInterfaceBodies(source) {
  const bodies = [];
  const re = /export\s+interface\s+\w*Props\b[^{]*\{/g;
  let match;

  while ((match = re.exec(source))) {
    let depth = 1;
    let index = re.lastIndex;
    const start = index;

    while (index < source.length && depth > 0) {
      const char = source[index++];
      if (char === "{") depth++;
      if (char === "}") depth--;
    }

    bodies.push(source.slice(start, index - 1));
  }

  return bodies;
}

function splitMembers(body) {
  const members = [];
  let current = "";
  let depth = 0;
  let quote = null;

  for (let i = 0; i < body.length; i++) {
    const char = body[i];

    if (quote) {
      current += char;
      if (char === quote && body[i - 1] !== "\\") quote = null;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }

    if (char === "{" || char === "(" || char === "[" || char === "<") depth++;
    if (char === "}" || char === ")" || char === "]" || char === ">") {
      depth = Math.max(0, depth - 1);
    }

    if (char === ";" && depth === 0) {
      members.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) members.push(current.trim());
  return members;
}

function propSchemaFromMember(member) {
  const cleaned = member.replace(/\/\*\*[\s\S]*?\*\//g, "").trim();
  if (!cleaned || cleaned.startsWith("extends ")) return null;

  const match = cleaned.match(
    /^(?:readonly\s+)?(["'][^"']+["']|[A-Za-z_$][\w$-]*)\??\s*:\s*([\s\S]+)$/,
  );
  if (!match) return null;

  const rawName = match[1].replace(/^['"]|['"]$/g, "");
  const type = match[2].replace(/\s+/g, " ").trim();

  return [
    rawName,
    {
      type,
      required: !cleaned.includes(`${match[1]}?:`),
    },
  ];
}

function collectProps(dir) {
  const props = {};

  for (const file of readFiles(dir)) {
    const source = fs.readFileSync(file, "utf8");
    for (const body of findInterfaceBodies(source)) {
      for (const member of splitMembers(body)) {
        const parsed = propSchemaFromMember(member);
        if (parsed) props[parsed[0]] = parsed[1];
      }
    }
  }

  return props;
}

for (const key of Object.keys(pkg.exports).filter((entry) =>
  entry.startsWith("./components/"),
)) {
  const slug = key.replace("./components/", "");
  const name = pascal(slug);
  if (registry.components[name]) {
    registry.components[name].props = collectProps(path.join("src/components", slug));
  }
}

for (const key of Object.keys(pkg.exports).filter((entry) =>
  entry.startsWith("./blocks/"),
)) {
  const slug = key.replace("./blocks/", "");
  const name = pascal(slug);
  if (registry.blocks[name]) {
    registry.blocks[name].props = collectProps(path.join("src/blocks", slug));
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

