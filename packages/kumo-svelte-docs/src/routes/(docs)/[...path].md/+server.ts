import { error } from "@sveltejs/kit";
import { docsChangelogMarkdown } from "$lib/package-changelog";
import { markdownFromSource } from "$lib/server/doc-markdown";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

const pageSources = import.meta.glob<string>(
  [
    "../*/+page.svx",
    "../components/*/+page.svx",
    "../charts/+page.svx",
    "../charts/*/+page.svx",
    "../blocks/*/+page.svx",
  ],
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
);

export const entries: EntryGenerator = () =>
  Object.keys(pageSources)
    .map((path) => sourcePathToDocPath(path))
    .filter((path): path is string => Boolean(path))
    .map((path) => ({ path }));

export const GET: RequestHandler = ({ params }) => {
  const source = sourceForDocPath(params.path);

  if (!source) {
    error(404, "Markdown page not found");
  }

  return new Response(markdownFromSource(source), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
    },
  });
};

function sourceForDocPath(docPath: string) {
  if (docPath === "changelog") return docsChangelogMarkdown;

  return Object.entries(pageSources).find(([path]) => sourcePathToDocPath(path) === docPath)?.[1];
}

function sourcePathToDocPath(path: string) {
  const match = path.match(/(?:\.\.\/|\/routes\/\(docs\)\/)(.+)\/\+page\.svx$/);
  return match?.[1];
}
