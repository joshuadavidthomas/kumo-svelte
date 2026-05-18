import { getHomePage } from "$docs/docs.server";

export function load() {
  return {
    page: getHomePage(),
  };
}
