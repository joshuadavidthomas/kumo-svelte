import { existsSync } from "node:fs";
import { error } from "@sveltejs/kit";
import { parseComponentMetadata } from "$lib/component-docs";
import { apiDocs, type ApiComponentDoc } from "$lib/generated/api-docs";
import { docsChangelogMarkdown } from "$lib/package-changelog";
import {
  pageFromMetadata,
  type ComponentPageMetadata,
  type DocTocItem,
} from "$lib/routes/component-pages";
import { highlightCode } from "$lib/server/highlight";
import type { LayoutServerLoad } from "./$types";

interface DocPageMetadata {
  description: string;
  sourceFile?: string;
  title: string;
}

interface DocPageData {
  bitsUiUrl?: string;
  description: string;
  editUrl?: string;
  href: string;
  sourceFile?: string;
  title: string;
  toc: DocTocItem[];
}

interface DocsLoadData {
  highlightedDemos: Record<string, string>;
  page: DocPageData;
}

const routeRoot = "/src/routes/(docs)";

const staticPages = import.meta.glob<DocPageMetadata>("./*/+page.svx", {
  eager: true,
  import: "metadata",
});
const staticPageSources = import.meta.glob<string>("./*/+page.svx", {
  eager: true,
  query: "?raw",
  import: "default",
});

const componentPages = import.meta.glob<ComponentPageMetadata>("./components/*/+page.svx", {
  eager: true,
  import: "metadata",
});
const componentPageSources = import.meta.glob<string>("./components/*/+page.svx", {
  eager: true,
  query: "?raw",
  import: "default",
});
const componentDemoSources = import.meta.glob<string>("./components/*/*-demo.svelte", {
  eager: true,
  query: "?raw",
  import: "default",
});

const chartPages = import.meta.glob<DocPageMetadata>(
  ["./charts/+page.svx", "./charts/*/+page.svx"],
  {
    eager: true,
    import: "metadata",
  },
);
const chartPageSources = import.meta.glob<string>(["./charts/+page.svx", "./charts/*/+page.svx"], {
  eager: true,
  query: "?raw",
  import: "default",
});
const chartDemoSources = import.meta.glob<string>(
  ["./charts/*-demo.svelte", "./charts/*/*-demo.svelte"],
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
);

const blockPages = import.meta.glob<DocPageMetadata>("./blocks/*/+page.svx", {
  eager: true,
  import: "metadata",
});
const blockPageSources = import.meta.glob<string>("./blocks/*/+page.svx", {
  eager: true,
  query: "?raw",
  import: "default",
});
const blockDemoSources = import.meta.glob<string>("./blocks/*/*-demo.svelte", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const load: LayoutServerLoad = async ({ url }) => {
  const segments = url.pathname
    .replace(/^\/|\/$/g, "")
    .split("/")
    .filter(Boolean);
  const [section, slug, extra] = segments;

  if (!section || extra) {
    error(404, "Documentation page not found");
  }

  if (section === "components" && slug) {
    return loadComponentPage(slug);
  }

  if (section === "charts") {
    return loadSectionPage({
      demoSlug: slug ?? "index",
      demoSources: chartDemoSources,
      docPath: slug ? `charts/${slug}` : "charts",
      href: url.pathname,
      pageSources: chartPageSources,
      pages: chartPages,
      section: "charts",
      sourceRoot: "components/chart",
    });
  }

  if (section === "blocks" && slug) {
    return loadSectionPage({
      demoSlug: slug,
      demoSources: blockDemoSources,
      docPath: `blocks/${slug}`,
      href: url.pathname,
      pageSources: blockPageSources,
      pages: blockPages,
      section: "blocks",
    });
  }

  if (segments.length === 1) {
    return loadStaticPage(section);
  }

  error(404, "Documentation page not found");
};

function loadStaticPage(slug: string): DocsLoadData {
  const pageEntry = entryForDocPath(staticPages, slug);
  const sourceEntry = entryForDocPath(staticPageSources, slug);

  if (!pageEntry || !sourceEntry) {
    error(404, "Documentation page not found");
  }

  return {
    highlightedDemos: {},
    page: {
      description: pageEntry.description,
      href: `/${slug}`,
      title: pageEntry.title,
      toc: tocFromMarkdown(slug === "changelog" ? docsChangelogMarkdown : sourceEntry),
    },
  };
}

async function loadComponentPage(slug: string): Promise<DocsLoadData> {
  const pageEntry = entryForDocPath(componentPages, `components/${slug}`);
  const sourceEntry = entryForDocPath(componentPageSources, `components/${slug}`);

  if (!pageEntry || !sourceEntry) {
    error(404, "Component page not found");
  }

  const metadata = parseComponentMetadata(slug, pageEntry);

  return {
    highlightedDemos: await highlightedDemosForSlug(componentDemoSources, "components", slug),
    page: pageFromMetadata(slug, metadata, tocFromMarkdown(sourceEntry)),
  };
}

interface SectionLoadOptions {
  demoSlug: string;
  demoSources: Record<string, string>;
  docPath: string;
  href: string;
  pageSources: Record<string, string>;
  pages: Record<string, DocPageMetadata>;
  section: string;
  sourceRoot?: string;
}

async function loadSectionPage({
  demoSlug,
  demoSources,
  docPath,
  href,
  pageSources,
  pages,
  section,
  sourceRoot = section,
}: SectionLoadOptions): Promise<DocsLoadData> {
  const pageEntry = entryForDocPath(pages, docPath);
  const sourceEntry = entryForDocPath(pageSources, docPath);

  if (!pageEntry || !sourceEntry) {
    error(404, "Documentation page not found");
  }

  const sourceFile = pageEntry.sourceFile ?? `${sourceRoot}/${demoSlug}`;

  return {
    highlightedDemos: await highlightedDemosForSlug(demoSources, section, demoSlug),
    page: {
      description: pageEntry.description,
      editUrl: editUrlForSourceFile(sourceFile),
      href,
      sourceFile,
      title: pageEntry.title,
      toc: tocFromMarkdown(sourceEntry),
    },
  };
}

function editUrlForSourceFile(sourceFile: string) {
  const sourceUrl = new URL(`../../../../kumo-svelte/src/${sourceFile}`, import.meta.url);

  if (!existsSync(sourceUrl)) return undefined;

  return `https://github.com/joshuadavidthomas/kumo-svelte/tree/main/packages/kumo-svelte/src/${sourceFile}`;
}

function entryForDocPath<T>(entries: Record<string, T>, docPath: string) {
  const relativePath = `./${docPath}/+page.svx`;
  const absolutePath = `${routeRoot}/${docPath}/+page.svx`;
  const suffix = `/routes/(docs)/${docPath}/+page.svx`;

  return (
    entries[relativePath] ??
    entries[absolutePath] ??
    Object.entries(entries).find(
      ([path]) => path.endsWith(suffix) || path.endsWith(relativePath.slice(1)),
    )?.[1]
  );
}

async function highlightedDemosForSlug(
  demoSources: Record<string, string>,
  section: string,
  slug: string,
) {
  const demos = Object.entries(demoSources).filter(([path]) =>
    path.includes(`/${section}/${slug}/`),
  );

  return Object.fromEntries(
    await Promise.all(
      demos.map(async ([path, code]) => {
        const name =
          path
            .split("/")
            .at(-1)
            ?.replace(/\.svelte$/, "") ?? path;
        return [name, await highlightCode(code, "svelte")];
      }),
    ),
  );
}

function tocFromMarkdown(source: string) {
  const content = source.replace(/^---[\s\S]*?---/, "");
  const seen = new Map<string, number>();
  const tocEntries: Array<{ index: number; items: DocTocItem[] }> = [];

  for (const heading of content.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const text = heading[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/<[^>]+>/g, "")
      .trim();
    const baseId = slugify(text);
    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);

    tocEntries.push({
      index: heading.index ?? 0,
      items: [
        {
          depth: heading[1].length,
          id: count === 0 ? baseId : `${baseId}-${count}`,
          text,
        },
      ],
    });
  }

  for (const apiReference of content.matchAll(/<ApiReference\s+([^>]*?)\/>/gs)) {
    tocEntries.push({
      index: apiReference.index ?? 0,
      items: apiReferenceTocItems(apiReference[1]),
    });
  }

  return tocEntries.sort((a, b) => a.index - b.index).flatMap((entry) => entry.items);
}

function apiReferenceTocItems(propsSource: string): DocTocItem[] {
  return apiReferenceComponents(propsSource).map((component) => ({
    depth: 3,
    id: component.name,
    text: component.name,
  }));
}

function apiReferenceComponents(propsSource: string): ApiComponentDoc[] {
  const componentNames = arrayPropValues(propsSource, "components");
  if (componentNames.length > 0) {
    return componentNames
      .map((name) => apiDocs.find((component) => component.name === name))
      .filter((component): component is ApiComponentDoc => component !== undefined);
  }

  const family = stringPropValue(propsSource, "family");
  if (!family) return [];

  const excluded = new Set(arrayPropValues(propsSource, "exclude"));
  return apiDocs
    .filter((component) => component.family === family && !excluded.has(component.name))
    .sort(compareApiComponents);
}

function arrayPropValues(propsSource: string, propName: string) {
  const match = propsSource.match(new RegExp(`${propName}=\\{\\[([\\s\\S]*?)\\]\\}`));
  if (!match) return [];

  return Array.from(match[1].matchAll(/["']([^"']+)["']/g), (value) => value[1]);
}

function stringPropValue(propsSource: string, propName: string) {
  const match = propsSource.match(
    new RegExp(`${propName}=(?:"([^"]+)"|'([^']+)'|\\{["']([^"']+)["']\\})`),
  );
  return match?.[1] ?? match?.[2] ?? match?.[3];
}

function compareApiComponents(a: ApiComponentDoc, b: ApiComponentDoc) {
  const aIsRoot = a.name === a.family;
  const bIsRoot = b.name === b.family;

  if (aIsRoot && !bIsRoot) return -1;
  if (!aIsRoot && bIsRoot) return 1;
  return a.name.localeCompare(b.name);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Mark}\p{Decimal_Number} _-]/gu, "")
    .replace(/ /g, "-");
}
