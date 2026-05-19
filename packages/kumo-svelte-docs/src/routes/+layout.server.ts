import pkg from "../../../kumo-svelte/package.json";
import type { DocPageMetadata } from "$lib/routes/doc-pages";

interface MdsvexPageModule {
  metadata: DocPageMetadata;
}

const staticPages = import.meta.glob<MdsvexPageModule>("/src/routes/*/+page.svx", {
  eager: true,
});
const staticPageSources = import.meta.glob<string>("/src/routes/*/+page.svx", {
  eager: true,
  query: "?raw",
  import: "default",
});

export function load({ route }) {
  const slug = route.id?.match(/^\/([^/]+)$/)?.[1];
  const entry = slug
    ? Object.entries(staticPages).find(([path]) => path.includes(`/routes/${slug}/+page.svx`))
    : undefined;
  const sourceEntry = slug
    ? Object.entries(staticPageSources).find(([path]) => path.includes(`/routes/${slug}/+page.svx`))
    : undefined;

  return {
    docPage: entry
      ? {
          description: entry[1].metadata.description,
          href: `/${slug}`,
          title: entry[1].metadata.title,
          toc: sourceEntry ? tocFromMarkdown(sourceEntry[1]) : [],
        }
      : undefined,
    version: pkg.version,
  };
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
    const baseId = text
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);
    return { depth: heading[1].length, id: count === 0 ? baseId : `${baseId}-${count}`, text };
  });
}
