import { loadDocPage, type DocPageMetadata } from "$lib/routes/doc-pages";

interface MdsvexPageModule {
  metadata: DocPageMetadata;
}

const pages = import.meta.glob<MdsvexPageModule>("/src/routes/blocks/*/+page.svx", {
  eager: true,
});
const pageSources = import.meta.glob<string>("/src/routes/blocks/*/+page.svx", {
  eager: true,
  query: "?raw",
  import: "default",
});
const demoSources = import.meta.glob<string>("/src/routes/blocks/*/*-demo.svelte", {
  eager: true,
  query: "?raw",
  import: "default",
});

export async function load({ route }) {
  return loadDocPage({
    basePath: "blocks",
    demoSources,
    pageSources,
    pages,
    routeId: route.id,
  });
}
