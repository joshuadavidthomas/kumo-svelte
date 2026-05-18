declare module "phosphor-svelte/lib/*" {
  import type { Component } from "svelte";

  const icon: Component<Record<string, unknown>>;
  export default icon;
}
