<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip as TooltipPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";

  export interface TooltipPortalProps {
    children?: Snippet;
    to?: PortalProps["to"];
  }

  let { children, to }: TooltipPortalProps = $props();

  const portalContext = getKumoPortalContext();
  let portalContainer = $derived(to ?? portalContext.container);
</script>

<TooltipPrimitive.Portal to={portalContainer}>
  {@render children?.()}
</TooltipPrimitive.Portal>
