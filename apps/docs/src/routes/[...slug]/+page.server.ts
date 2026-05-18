import { error } from "@sveltejs/kit";
import { getAllDocEntries, getDocPage } from "$docs/docs.server";
import type { EntryGenerator } from "./$types";

export const entries: EntryGenerator = () => getAllDocEntries();

export function load({ params }) {
  const page = getDocPage(params.slug);

  if (!page) {
    error(404, "Documentation page not found");
  }

  return { page };
}
