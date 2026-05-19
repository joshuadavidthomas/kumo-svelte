<script lang="ts">
  import type { Snippet } from "svelte";
  import { Popover as PopoverPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";

  export interface PopoverPortalProps {
    children?: Snippet;
    to?: PortalProps["to"];
  }

  let { children, to }: PopoverPortalProps = $props();

  const portalContext = getKumoPortalContext();
  let portalContainer = $derived(to ?? portalContext.container);
</script>

<PopoverPrimitive.Portal to={portalContainer}>
  {@render children?.()}
</PopoverPrimitive.Portal>
