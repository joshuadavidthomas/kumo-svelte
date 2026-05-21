import { error } from "@sveltejs/kit";
import { parseComponentMetadata } from "$lib/component-docs";
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

interface MdsvexPageModule<TMetadata> {
  metadata: TMetadata;
}

interface DocPageData {
  description: string;
  editUrl?: string;
  href: string;
  primitiveUrl?: string;
  sourceFile?: string;
  title: string;
  toc: DocTocItem[];
}

interface DocsLoadData {
  highlightedDemos: Record<string, string>;
  page: DocPageData;
}

const routeRoot = "/src/routes/(docs)";

const staticPages = import.meta.glob<MdsvexPageModule<DocPageMetadata>>("./*/+page.svx", {
  eager: true,
});
const staticPageSources = import.meta.glob<string>("./*/+page.svx", {
  eager: true,
  query: "?raw",
  import: "default",
});

const componentPages = import.meta.glob<MdsvexPageModule<ComponentPageMetadata>>(
  "./components/*/+page.svx",
  {
    eager: true,
  },
);
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

const chartPages = import.meta.glob<MdsvexPageModule<DocPageMetadata>>(
  ["./charts/+page.svx", "./charts/*/+page.svx"],
  {
    eager: true,
  },
);
const chartPageSources = import.meta.glob<string>(
  ["./charts/+page.svx", "./charts/*/+page.svx"],
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
);
const chartDemoSources = import.meta.glob<string>(
  ["./charts/*-demo.svelte", "./charts/*/*-demo.svelte"],
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
);

const blockPages = import.meta.glob<MdsvexPageModule<DocPageMetadata>>("./blocks/*/+page.svx", {
  eager: true,
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
      description: pageEntry.metadata.description,
      href: `/${slug}`,
      title: pageEntry.metadata.title,
      toc: tocFromMarkdown(sourceEntry),
    },
  };
}

async function loadComponentPage(slug: string): Promise<DocsLoadData> {
  const pageEntry = entryForDocPath(componentPages, `components/${slug}`);
  const sourceEntry = entryForDocPath(componentPageSources, `components/${slug}`);

  if (!pageEntry || !sourceEntry) {
    error(404, "Component page not found");
  }

  const metadata = parseComponentMetadata(slug, pageEntry.metadata);

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
  pages: Record<string, MdsvexPageModule<DocPageMetadata>>;
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

  const sourceFile = pageEntry.metadata.sourceFile ?? `${sourceRoot}/${demoSlug}`;

  return {
    highlightedDemos: await highlightedDemosForSlug(demoSources, section, demoSlug),
    page: {
      description: pageEntry.metadata.description,
      editUrl: `https://github.com/joshuadavidthomas/kumo-svelte/tree/main/packages/kumo-svelte/src/${sourceFile}`,
      href,
      sourceFile,
      title: pageEntry.metadata.title,
      toc: tocFromMarkdown(sourceEntry),
    },
  };
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
  const headings = Array.from(content.matchAll(/^(#{2,3})\s+(.+)$/gm));
  const seen = new Map<string, number>();

  return headings.map((heading) => {
    const text = heading[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/<[^>]+>/g, "")
      .trim();
    const baseId = slugify(text);
    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);

    return {
      depth: heading[1].length,
      id: count === 0 ? baseId : `${baseId}-${count}`,
      text,
    };
  });
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Mark}\p{Decimal_Number} _-]/gu, "")
    .replace(/ /g, "-");
}
