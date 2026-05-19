import pkg from "../../../kumo-svelte/package.json";

export function load() {
  return {
    version: pkg.version,
  };
}
