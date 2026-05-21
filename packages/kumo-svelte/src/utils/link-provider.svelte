<script lang="ts">
  import type { Snippet } from "svelte";
  import {
    KumoLinkContextState,
    setKumoLinkContext,
    type LinkComponent,
  } from "./link-context.svelte";

  export interface LinkProviderProps {
    children?: Snippet;
    component?: LinkComponent;
  }

  let { children, component }: LinkProviderProps = $props();

  setKumoLinkContext(new KumoLinkContextState(() => component));
</script>

{@render children?.()}
