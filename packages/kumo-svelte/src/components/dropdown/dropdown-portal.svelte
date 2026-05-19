<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";

  export interface DropdownMenuPortalProps {
    children?: Snippet;
    to?: PortalProps["to"];
  }

  let { children, to }: DropdownMenuPortalProps = $props();

  const portalContext = getKumoPortalContext();
  let portalContainer = $derived(to ?? portalContext.container);
</script>

<DropdownMenuPrimitive.Portal to={portalContainer}>
  {@render children?.()}
</DropdownMenuPrimitive.Portal>
