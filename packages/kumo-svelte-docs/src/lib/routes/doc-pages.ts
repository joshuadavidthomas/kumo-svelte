import { error } from "@sveltejs/kit";
import { highlightCode } from "$lib/server/highlight";
import type { DocTocItem } from "$lib/routes/component-pages";

export interface DocPageMetadata {
  baseUIComponent?: string;
  description: string;
  sourceFile?: string;
  title: string;
}

export interface DocPageData {
  description: string;
  editUrl?: string;
  href: string;
  sourceFile?: string;
  title: string;
  toc: DocTocItem[];
}

interface MdsvexPageModule {
  metadata: DocPageMetadata;
}

interface DocLoadOptions {
  basePath: string;
  demoSources: Record<string, string>;
  pageSources: Record<string, string>;
  pages: Record<string, MdsvexPageModule>;
  routeId: string | null;
  sourceRoot?: string;
}

export async function loadDocPage({
  basePath,
  demoSources,
  pageSources,
  pages,
  routeId,
  sourceRoot = basePath,
}: DocLoadOptions) {
  const slug = slugFromRoute(routeId, basePath);
  if (!slug) {
    error(404, "Documentation page not found");
  }

  const pageEntry = entryForSlug(pages, basePath, slug);
  const sourceEntry = entryForSlug(pageSources, basePath, slug);

  if (!pageEntry || !sourceEntry) {
    error(404, "Documentation page not found");
  }

  const metadata = pageEntry.value.metadata;
  const sourceFile = metadata.sourceFile ?? `${sourceRoot}/${slug}`;

  return {
    highlightedDemos: await highlightedDemosForSlug(demoSources, basePath, slug),
    page: {
      description: metadata.description,
      editUrl: `https://github.com/joshuadavidthomas/kumo-svelte/tree/main/packages/kumo-svelte/src/${sourceFile}`,
      href: `/${basePath}/${slug}`,
      sourceFile,
      title: metadata.title,
      toc: tocFromMarkdown(sourceEntry.value),
    } satisfies DocPageData,
  };
}

function slugFromRoute(routeId: string | null, basePath: string) {
  return routeId?.match(new RegExp(`^/${basePath}/([^/]+)$`))?.[1];
}

function entryForSlug<T>(entries: Record<string, T>, basePath: string, slug: string) {
  const entry = Object.entries(entries).find(([path]) =>
    path.includes(`/routes/${basePath}/${slug}/+page.svx`),
  );
  return entry ? { path: entry[0], value: entry[1] } : undefined;
}

async function highlightedDemosForSlug(
  demoSources: Record<string, string>,
  basePath: string,
  slug: string,
) {
  const demos = Object.entries(demoSources).filter(([path]) =>
    path.includes(`/${basePath}/${slug}/`),
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
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
