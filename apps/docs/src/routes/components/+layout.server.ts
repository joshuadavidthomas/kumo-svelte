import { error } from "@sveltejs/kit";
import { parseComponentMetadata, slugFromPagePath } from "$lib/component-docs";
import { pageFromMetadata, type ComponentPageMetadata } from "$lib/routes/component-pages";
import { highlightCode } from "$lib/server/highlight";

interface MdsvexPageModule {
  metadata: ComponentPageMetadata;
}

const pages = import.meta.glob<MdsvexPageModule>("/src/routes/components/*/+page.svx", { eager: true });
const pageSources = import.meta.glob<string>("/src/routes/components/*/+page.svx", {
  eager: true,
  query: "?raw",
  import: "default",
});
const demoSources = import.meta.glob<string>("/src/routes/components/*/*-demo.svelte", {
  eager: true,
  query: "?raw",
  import: "default",
});

export async function load({ route }) {
  const slug = route.id?.match(/^\/components\/([^/]+)$/)?.[1];
  if (!slug) {
    error(404, "Component page not found");
  }

  const pageEntry = entryForSlug(pages, slug);
  const sourceEntry = entryForSlug(pageSources, slug);

  if (!pageEntry || !sourceEntry) {
    error(404, "Component page not found");
  }

  const metadata = parseComponentMetadata(slug, pageEntry.value.metadata);
  const highlightedDemos = await highlightedDemosForSlug(slug);

  return {
    highlightedDemos,
    page: pageFromMetadata(slug, metadata, tocFromMarkdown(sourceEntry.value)),
  };
}

function entryForSlug<T>(entries: Record<string, T>, slug: string) {
  const entry = Object.entries(entries).find(([path]) => slugFromPagePath(path) === slug);
  return entry ? { path: entry[0], value: entry[1] } : undefined;
}

async function highlightedDemosForSlug(slug: string) {
  const demos = Object.entries(demoSources).filter(([path]) => path.includes(`/components/${slug}/`));
  return Object.fromEntries(
    await Promise.all(
      demos.map(async ([path, code]) => {
        const name = path.split("/").at(-1)?.replace(/\.svelte$/, "") ?? path;
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
    const text = heading[2].replace(/`([^`]+)`/g, "$1").replace(/<[^>]+>/g, "").trim();
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
