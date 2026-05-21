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

  setKumoPortalContext(new KumoPortalContextState(() => container));
</script>

{@render children?.()}

