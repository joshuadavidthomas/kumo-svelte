declare module "*.svx" {
  import type { Component } from "svelte";
  import type { ComponentPageMetadata } from "$lib/component-docs";

  export const metadata: ComponentPageMetadata;
  const component: Component;
  export default component;
}
