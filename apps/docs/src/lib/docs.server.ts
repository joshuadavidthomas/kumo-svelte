import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { blockItems, chartItems, componentItems, docsNavigation, staticPages } from "./nav";

export interface DocTocItem {
  depth: number;
  id: string;
  text: string;
}

export interface DocPage {
  description: string;
  editUrl?: string;
  html: string;
  href: string;
  primitiveUrl?: string;
  sourceFile?: string;
  sourcePath?: string;
  title: string;
  toc: DocTocItem[];
}

interface Frontmatter {
  baseUIComponent?: string;
  description?: string;
  sourceFile?: string;
  title?: string;
}

interface RegistryComponent {
  description?: string;
  importPath?: string;
  props?: Record<string, RegistryProp>;
  subComponents?: Record<string, { description?: string; props?: Record<string, RegistryProp> }>;
  upstreamExamples?: string[];
}

interface RegistryProp {
  default?: string;
  description?: string;
  optional?: boolean;
  required?: boolean;
  type: string;
  values?: readonly string[];
}

interface Registry {
  components?: Record<string, RegistryComponent>;
  blocks?: Record<string, RegistryComponent>;
}

const repoRoot = path.resolve(process.cwd(), "../..");
const upstreamPagesRoot = path.join(
  repoRoot,
  "reference/cloudflare-kumo/packages/kumo-docs-astro/src/pages",
);
const registryPath = path.join(repoRoot, "src/registry/component-registry.json");
const registry = JSON.parse(readFileSync(registryPath, "utf8")) as Registry;
const pages = buildPages();

export { docsNavigation };

export function getHomePage() {
  return pages.get("/") ?? createHomePage();
}

export function getDocPage(slug: string) {
  return pages.get(`/${slug.replace(/^\/+|\/+$/g, "")}`);
}

export function getAllDocEntries() {
  return [...pages.keys()]
    .filter((href) => href !== "/")
    .map((href) => ({ slug: href.replace(/^\//, "") }));
}

function buildPages() {
  const docPages = new Map<string, DocPage>();

  if (existsSync(upstreamPagesRoot)) {
    for (const filePath of walk(upstreamPagesRoot)) {
      if (!/\.(astro|mdx)$/.test(filePath)) continue;
      if (filePath.includes(`${path.sep}api${path.sep}`)) continue;
      if (filePath.includes(`${path.sep}tests${path.sep}`)) continue;
      if (filePath.includes(`${path.sep}changelog${path.sep}`)) continue;

      const href = hrefForFile(filePath);
      const page = pageFromSource(filePath, href);
      docPages.set(href, page);
    }
  }

  docPages.set("/changelog", createChangelogPage());
  docPages.set("/installation", createInstallationPage());

  for (const item of [...staticPages, ...componentItems, ...chartItems, ...blockItems]) {
    if (!docPages.has(item.href)) {
      docPages.set(item.href, createMissingPage(item.href, item.label));
    }
  }

  docPages.set("/", createHomePage());

  return new Map([...docPages.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

function pageFromSource(filePath: string, href: string): DocPage {
  const source = readFileSync(filePath, "utf8");
  const frontmatter = readFrontmatter(source);
  const layoutAttrs = readDocLayoutAttributes(source);
  const title = frontmatter.title ?? layoutAttrs.title ?? titleForHref(href);
  const description = frontmatter.description ?? layoutAttrs.description ?? descriptionForPage(href, title);
  const sourceFile = frontmatter.sourceFile ?? layoutAttrs.sourceFile ?? sourceFileForHref(href);
  const baseUIComponent = frontmatter.baseUIComponent ?? layoutAttrs.baseUIComponent;
  const markdown = normalizeSource(source, sourceFile);
  const { html, toc } = renderMarkdown(markdown, sourceFile);

  return {
    description: adaptText(description),
    editUrl: sourceFile ? sourceUrl(sourceFile) : undefined,
    href,
    html,
    primitiveUrl: primitiveUrl(baseUIComponent, sourceFile),
    sourceFile,
    sourcePath: path.relative(repoRoot, filePath),
    title,
    toc,
  };
}

function createHomePage(): DocPage {
  const componentLinks = componentItems
    .map((item) => `<a class="home-card" href="${item.href}"><span>${item.label}</span></a>`)
    .join("");
  const chartLinks = chartItems
    .filter((item) => item.href !== "/charts")
    .map((item) => `<a class="home-card" href="${item.href}"><span>${item.label}</span></a>`)
    .join("");

  return {
    description: "A SvelteKit documentation port for the Kumo Svelte component library.",
    href: "/",
    html: `
      <section class="home-hero">
        <p class="eyebrow">Kumo Svelte</p>
        <h1>Cloudflare Kumo components, ported to Svelte.</h1>
        <p>The original Kumo docs are rendered here through SvelteKit, adapted for the <code>kumo-svelte</code> package and its Bits UI primitive layer.</p>
        <div class="home-actions">
          <a class="button-link primary" href="/installation">Install</a>
          <a class="button-link" href="/components/button">Browse Components</a>
        </div>
      </section>
      <section>
        <h2 id="components">Components</h2>
        <div class="home-grid">${componentLinks}</div>
      </section>
      <section>
        <h2 id="charts">Charts</h2>
        <div class="home-grid">${chartLinks}</div>
      </section>
    `,
    title: "Kumo Svelte",
    toc: [
      { depth: 2, id: "components", text: "Components" },
      { depth: 2, id: "charts", text: "Charts" },
    ],
  };
}

function createChangelogPage(): DocPage {
  return {
    description: "Release notes for Kumo Svelte.",
    href: "/changelog",
    html: `<p>The upstream Astro docs render changelog entries from release metadata. This SvelteKit port is wired for the route and can be connected to release data when it exists in this repository.</p>`,
    title: "Changelog",
    toc: [],
  };
}

function createInstallationPage(): DocPage {
  const markdown = `
## NPM Registry

The \`kumo-svelte\` package is published to the public npm registry. No special configuration is required for installation.

## Install Package

Install Kumo Svelte using your preferred package manager.

#### npm

\`\`\`bash
npm install kumo-svelte
\`\`\`

#### pnpm

\`\`\`bash
pnpm add kumo-svelte
\`\`\`

#### yarn

\`\`\`bash
yarn add kumo-svelte
\`\`\`

#### Peer Dependencies

Kumo Svelte expects Svelte 5 and Tailwind CSS in the consuming app. Chart components also use ECharts.

\`\`\`bash
pnpm add svelte tailwindcss echarts
\`\`\`

## Import Components

Import components from the main package or use granular imports for better tree-shaking.

#### Main Package Import

\`\`\`svelte
<script lang="ts">
  import { Button, Input, LayerCard } from "kumo-svelte";
</script>
\`\`\`

#### Granular Import

\`\`\`svelte
<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { Input } from "kumo-svelte/components/input";
</script>
\`\`\`

## Bits UI Primitives

Kumo Svelte is built on top of [Bits UI](https://www.bits-ui.com), a library of unstyled, accessible Svelte components. For lower-level composition, install and import Bits UI directly.

\`\`\`svelte
<script lang="ts">
  import { Dialog, Popover, Select } from "bits-ui";
</script>
\`\`\`

## Import Styles

Kumo Svelte components use Tailwind utility classes plus Kumo CSS variables. Import Tailwind and Kumo styles once in your app CSS.

\`\`\`css
@import "tailwindcss";
@import "kumo-svelte/styles";
\`\`\`

## Usage Example

\`\`\`svelte
<script lang="ts">
  import { Button, Input, LayerCard } from "kumo-svelte";
  import "kumo-svelte/styles";
</script>

<LayerCard class="rounded-lg p-6">
  <h1 class="mb-4 text-2xl font-bold">Welcome to Kumo</h1>
  <Input placeholder="Enter your name..." class="mb-4" />
  <Button variant="primary">Submit</Button>
</LayerCard>
\`\`\`

## Blocks vs Components

Components are published package exports. Blocks are higher-level compositions that can be copied into an application when you need ownership over the code.

## Utilities

\`\`\`ts
import { cn, safeRandomId } from "kumo-svelte/utils";
\`\`\`
`;
  const { html, toc } = renderMarkdown(markdown, undefined);

  return {
    description: "Get started with Kumo Svelte by installing the package and importing components.",
    href: "/installation",
    html,
    title: "Installation",
    toc,
  };
}

function createMissingPage(href: string, title: string): DocPage {
  return {
    description: `${title} documentation.`,
    href,
    html: `<p>This upstream documentation page does not have a source file in the current reference tree.</p>`,
    title,
    toc: [],
  };
}

function normalizeSource(source: string, sourceFile: string | undefined) {
  let body = source.replace(/^---[\s\S]*?---\s*/, "");

  body = body
    .replace(/^import[\s\S]*?;\s*$/gm, "")
    .replace(/^export const[\s\S]*?;\s*$/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<DocLayout[\s\S]*?>/g, "")
    .replace(/<\/DocLayout>/g, "")
    .replace(/<MainLayout[\s\S]*?>/g, "")
    .replace(/<\/MainLayout>/g, "")
    .replace(/<ComponentSection[^>]*>/g, "")
    .replace(/<\/ComponentSection>/g, "")
    .replace(/<Heading[^>]*level=\{?2\}?[^>]*>([\s\S]*?)<\/Heading>/g, "## $1")
    .replace(/<Heading[^>]*level=\{?3\}?[^>]*>([\s\S]*?)<\/Heading>/g, "### $1")
    .replace(/<Heading[^>]*level=\{?4\}?[^>]*>([\s\S]*?)<\/Heading>/g, "#### $1")
    .replace(/<Callout\s+type="([^"]+)"[^>]*>([\s\S]*?)<\/Callout>/g, (_, type, content) => {
      return `<div class="callout ${type}">${inline(compactContent(content))}</div>`;
    })
    .replace(/<CodeBlock\s+code=\{`([\s\S]*?)`\}\s+lang="([^"]+)"\s*\/>/g, (_, code, lang) => {
      return `\n\`\`\`${lang}\n${code.trim()}\n\`\`\`\n`;
    })
    .replace(/<CodeBlock\s+code=\{`([\s\S]*?)`\}[\s\S]*?lang="([^"]+)"[\s\S]*?\/>/g, (_, code, lang) => {
      return `\n\`\`\`${lang}\n${code.trim()}\n\`\`\`\n`;
    })
    .replace(/<ComponentExample\b([^>]*)>([\s\S]*?)<\/ComponentExample>/g, (_, attrs, content) => {
      const title = attrValue(attrs, "vrTitle") ?? attrValue(attrs, "demo") ?? "Example";
      const code = codeAttr(attrs) ?? codeFromExampleContent(content, sourceFile, title);
      return renderExampleMarkdown(title, code);
    })
    .replace(/<ComponentExample\b([^>]*)\/>/g, (_, attrs) => {
      const title = attrValue(attrs, "vrTitle") ?? attrValue(attrs, "demo") ?? "Example";
      const code = codeAttr(attrs) ?? registryExample(sourceFile, title);
      return renderExampleMarkdown(title, code);
    })
    .replace(/<PropsTable\s+component="([^"]+)"\s*\/>/g, (_, component) => propsTableHtml(component))
    .replace(/<ChartCard\s+title="([^"]+)"\s+description="([^"]+)"\s+href="([^"]+)"[\s\S]*?<\/ChartCard>/g, (_, title, description, href) => {
      return `<a class="doc-card" href="${href}"><strong>${title}</strong><span>${description}</span></a>`;
    })
    .replace(/<ChartCard\s+title="([^"]+)"\s+description="([^"]+)"\s+href="([^"]+)"\s*\/>/g, (_, title, description, href) => {
      return `<a class="doc-card" href="${href}"><strong>${title}</strong><span>${description}</span></a>`;
    })
    .replace(/<HomeGrid[\s\S]*?\/>/g, "")
    .replace(/<\/?p[^>]*>/g, "");

  return adaptSource(body).trim();
}

function renderMarkdown(markdown: string, sourceFile: string | undefined) {
  const toc: DocTocItem[] = [];
  const html: string[] = [];
  const lines = markdown.split(/\r?\n/);
  let paragraph: string[] = [];
  let list: string[] = [];
  let orderedList: string[] = [];
  let table: string[][] = [];
  let inFence = false;
  let fenceLang = "";
  let fenceLines: string[] = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`);
    list = [];
  }

  function flushOrderedList() {
    if (!orderedList.length) return;
    html.push(`<ol>${orderedList.map((item) => `<li>${inline(item)}</li>`).join("")}</ol>`);
    orderedList = [];
  }

  function flushTable() {
    if (!table.length) return;
    const [head, ...body] = table;
    html.push(
      `<div class="props-table"><table><thead><tr>${head.map((cell) => `<th>${inline(cell)}</th>`).join("")}</tr></thead><tbody>${body
        .map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table></div>`,
    );
    table = [];
  }

  for (const line of lines) {
    const fence = line.match(/^```(\w+)?/);
    if (fence) {
      flushParagraph();
      flushList();
      flushOrderedList();
      flushTable();
      if (inFence) {
        html.push(`<pre><code class="language-${escapeAttribute(fenceLang)}">${escapeHtml(fenceLines.join("\n"))}</code></pre>`);
        inFence = false;
        fenceLines = [];
        fenceLang = "";
      } else {
        inFence = true;
        fenceLang = fence[1] ?? "";
      }
      continue;
    }

    if (inFence) {
      fenceLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushOrderedList();
      flushTable();
      continue;
    }

    if (/^\s*\|.*\|\s*$/.test(line)) {
      flushParagraph();
      flushList();
      flushOrderedList();
      const cells = line
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((cell) => cell.trim());
      if (cells.every((cell) => /^:?-{3,}:?$/.test(cell))) continue;
      table.push(cells);
      continue;
    }

    if (/^-{3,}$/.test(line.trim())) {
      flushParagraph();
      flushList();
      flushOrderedList();
      flushTable();
      html.push("<hr />");
      continue;
    }

    const heading = line.match(/^\s*(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushOrderedList();
      flushTable();
      const depth = heading[1].length;
      const text = stripHtml(heading[2].trim());
      const id = uniqueSlug(text, toc);
      toc.push({ depth, id, text });
      html.push(`<h${depth} id="${id}">${inline(text)}</h${depth}>`);
      continue;
    }

    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph();
      flushOrderedList();
      flushTable();
      list.push(unordered[1]);
      continue;
    }

    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      flushList();
      flushTable();
      orderedList.push(ordered[1]);
      continue;
    }

    if (line.trim().startsWith("<")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      flushTable();
      html.push(adaptHtml(line.trim(), sourceFile));
      continue;
    }

    flushTable();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushOrderedList();
  flushTable();

  return { html: html.join("\n"), toc };
}

function renderExampleMarkdown(title: string, code: string | undefined) {
  if (!code) return `<div class="example-card"><strong>${escapeHtml(title)}</strong></div>`;
  return `<div class="example-card"><strong>${escapeHtml(title)}</strong>\n\n\`\`\`svelte\n${code.trim()}\n\`\`\`\n</div>`;
}

function propsTableHtml(componentName: string) {
  const component = findRegistryComponent(componentName);
  const props = component?.props;

  if (!props || Object.keys(props).length === 0) {
    return `<p class="muted">No generated prop metadata is available for <code>${escapeHtml(componentName)}</code>.</p>`;
  }

  const rows = Object.entries(props)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, prop]) => {
      const required = prop.required || prop.optional === false ? "Yes" : "No";
      return `<tr><td><code>${escapeHtml(name)}</code></td><td><code>${escapeHtml(prop.type)}</code></td><td>${required}</td><td>${inline(prop.description ?? "")}</td></tr>`;
    })
    .join("");

  return `<div class="props-table"><table><thead><tr><th>Prop</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function findRegistryComponent(name: string) {
  const normalized = name.toLowerCase();
  const all = { ...(registry.components ?? {}), ...(registry.blocks ?? {}) };
  for (const [key, component] of Object.entries(all)) {
    if (key.toLowerCase() === normalized || component.importPath?.toLowerCase().endsWith(`/${normalized}`)) {
      return component;
    }
    for (const [subName, subComponent] of Object.entries(component.subComponents ?? {})) {
      if (subName.toLowerCase() === normalized) return { ...subComponent, importPath: component.importPath };
    }
  }
  return undefined;
}

function registryExample(sourceFile: string | undefined, title: string) {
  if (!sourceFile) return undefined;
  const componentName = sourceFile
    .split("/")
    .pop()
    ?.split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
  const component =
    registry.components?.[componentName ?? ""] ??
    registry.blocks?.[componentName ?? ""] ??
    findRegistryComponent(componentName ?? "");
  const normalizedTitle = title.replace(/^(Variant:\s*)?/i, "").toLowerCase();
  return (
    component?.upstreamExamples?.find((example) =>
      example.toLowerCase().includes(`>${normalizedTitle}<`),
    ) ??
    component?.upstreamExamples?.find((example) =>
      example.toLowerCase().includes(normalizedTitle.replace(/\s+/g, "-")),
    ) ??
    component?.upstreamExamples?.[0]
  );
}

function codeFromExampleContent(content: string, sourceFile: string | undefined, title: string) {
  const explicit = content.match(/code=\{`([\s\S]*?)`\}/)?.[1];
  if (explicit) return explicit;
  return registryExample(sourceFile, title);
}

function readFrontmatter(source: string): Frontmatter {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const values: Frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!pair) continue;
    const key = pair[1] as keyof Frontmatter;
    const value = pair[2].replace(/^["']|["']$/g, "");
    values[key] = value;
  }
  return values;
}

function readDocLayoutAttributes(source: string): Frontmatter {
  const match = source.match(/<DocLayout([\s\S]*?)>/);
  if (!match) return {};

  return {
    baseUIComponent: attrValue(match[1], "baseUIComponent"),
    description: attrValue(match[1], "description"),
    sourceFile: attrValue(match[1], "sourceFile"),
    title: attrValue(match[1], "title"),
  };
}

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(entryPath));
    else files.push(entryPath);
  }
  return files;
}

function hrefForFile(filePath: string) {
  const relative = path.relative(upstreamPagesRoot, filePath).replaceAll(path.sep, "/");
  const withoutExt = relative.replace(/\.(astro|mdx)$/, "");
  if (withoutExt === "index") return "/";
  return `/${withoutExt.replace(/\/index$/, "")}`;
}

function sourceFileForHref(href: string) {
  if (href.startsWith("/components/")) return `components/${href.split("/").pop()}`;
  if (href.startsWith("/blocks/")) return `blocks/${href.split("/").pop()}`;
  if (href.startsWith("/charts/") || href === "/charts") return "components/chart";
  return undefined;
}

function sourceUrl(sourceFile: string) {
  const base = "https://github.com/joshuadavidthomas/kumo-svelte/tree/main/src";
  return `${base}/${sourceFile}`;
}

function primitiveUrl(baseUIComponent: string | undefined, sourceFile: string | undefined) {
  const name = baseUIComponent ?? sourceFile?.split("/").pop();
  if (!name) return undefined;
  const nonPrimitivePages = new Set([
    "chart",
    "cloudflare-logo",
    "code",
    "empty",
    "field",
    "flow",
    "grid",
    "input",
    "input-area",
    "input-group",
    "layer-card",
    "link",
    "loader",
    "pagination",
    "sensitive-input",
    "sidebar",
    "surface",
    "table",
    "table-of-contents",
    "text",
    "toast",
  ]);
  if (!baseUIComponent && nonPrimitivePages.has(name)) return undefined;
  const bitsName = name
    .replace("dropdown", "dropdown-menu")
    .replace("radio", "radio-group")
    .replace("menu-bar", "menubar");
  return `https://www.bits-ui.com/docs/components/${bitsName}`;
}

function titleForHref(href: string) {
  if (href === "/") return "Kumo Svelte";
  return href
    .split("/")
    .filter(Boolean)
    .pop()!
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function descriptionForPage(href: string, title: string) {
  const sourceFile = sourceFileForHref(href);
  const registryComponent = sourceFile
    ? (registry.components?.[sourceFile] ?? registry.blocks?.[sourceFile])
    : undefined;
  return registryComponent?.description ?? `${title} documentation.`;
}

function attrValue(attrs: string, name: string) {
  return attrs.match(new RegExp(`${name}="([^"]+)"`))?.[1];
}

function codeAttr(attrs: string) {
  return attrs.match(/code=\{`([\s\S]*?)`\}/)?.[1];
}

function adaptSource(source: string) {
  return source
    .replaceAll("@cloudflare/kumo", "kumo-svelte")
    .replaceAll("@phosphor-icons/react", "phosphor-svelte")
    .replaceAll("react react-dom ", "")
    .replaceAll("React projects", "Svelte projects")
    .replaceAll("React components", "Svelte components")
    .replaceAll("React component", "Svelte component")
    .replaceAll("ReactNode", "Snippet")
    .replaceAll("useState", "$state")
    .replaceAll("useEffect", "$effect")
    .replaceAll("forwardRef", "wrapper component")
    .replaceAll("Base UI", "Bits UI")
    .replaceAll("https://base-ui.com/react/overview/accessibility", "https://www.bits-ui.com/docs")
    .replaceAll("base-ui.com/react/components", "bits-ui.com/docs/components")
    .replaceAll("className=", "class=")
    .replaceAll("__KUMO_VERSION__", "\"latest\"")
    .replaceAll("{kumoVersion}", "latest");
}

function adaptText(text: string) {
  return text
    .replaceAll("@cloudflare/kumo", "kumo-svelte")
    .replaceAll("React components", "Svelte components")
    .replaceAll("React component", "Svelte component")
    .replaceAll("Base UI", "Bits UI");
}

function adaptHtml(html: string, sourceFile: string | undefined) {
  return html
    .replace(/<PropsTable\s+component="([^"]+)"\s*\/>/g, (_, component) => propsTableHtml(component))
    .replace(/<CodeBlock\s+code=\{`([\s\S]*?)`\}\s+lang="([^"]+)"\s*\/>/g, (_, code, lang) => {
      return `<pre><code class="language-${escapeAttribute(lang)}">${escapeHtml(code.trim())}</code></pre>`;
    })
    .replace(/<ComponentExample\b([^>]*)>([\s\S]*?)<\/ComponentExample>/g, (_, attrs, content) => {
      const title = attrValue(attrs, "vrTitle") ?? attrValue(attrs, "demo") ?? "Example";
      return renderExampleMarkdown(title, codeFromExampleContent(content, sourceFile, title));
    })
    .replace(/client:(load|visible|idle|only)="?[^"\s>]*"?/g, "")
    .replace(/<([A-Z][A-Za-z0-9.]*)[^>]*\/>/g, "")
    .replace(/<([A-Z][A-Za-z0-9.]*)[^>]*>/g, "")
    .replace(/<\/[A-Z][A-Za-z0-9.]*>/g, "");
}

function inline(value: string) {
  let text = escapeHtml(value);
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return text;
}

function compactContent(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueSlug(text: string, toc: DocTocItem[]) {
  const base = slugify(text);
  let slug = base;
  let index = 2;
  while (toc.some((item) => item.id === slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }
  return slug;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripHtml(text: string) {
  return text.replace(/<[^>]+>/g, "").replace(/\{|\}/g, "");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replaceAll(" ", "-");
}
