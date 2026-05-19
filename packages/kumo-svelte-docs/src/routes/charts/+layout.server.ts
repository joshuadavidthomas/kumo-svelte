import { loadDocPage, type DocPageMetadata } from "$lib/routes/doc-pages";

interface MdsvexPageModule {
  metadata: DocPageMetadata;
}

const pages = import.meta.glob<MdsvexPageModule>(
  ["/src/routes/charts/+page.svx", "/src/routes/charts/*/+page.svx"],
  {
    eager: true,
  },
);
const pageSources = import.meta.glob<string>(
  ["/src/routes/charts/+page.svx", "/src/routes/charts/*/+page.svx"],
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
);
const demoSources = import.meta.glob<string>(
  ["/src/routes/charts/*-demo.svelte", "/src/routes/charts/*/*-demo.svelte"],
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
);

export async function load({ route }) {
  return loadDocPage({
    basePath: "charts",
    demoSources,
    indexSlug: "index",
    pageSources,
    pages,
    routeId: route.id,
    sourceRoot: "components/chart",
  });
}
