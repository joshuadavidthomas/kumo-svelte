<script lang="ts">
  import type { Snippet } from "svelte";
  import {
    KumoPortalContextState,
    setKumoPortalContext,
    type PortalContainer,
  } from "./portal-provider.svelte";

  export interface KumoPortalProviderProps {
    children?: Snippet;
    container: PortalContainer;
  }

  let { children, container }: KumoPortalProviderProps = $props();

  const context = setKumoPortalContext(new KumoPortalContextState());

  $effect(() => {
    context.container = container;
  });
</script>

{@render children?.()}

