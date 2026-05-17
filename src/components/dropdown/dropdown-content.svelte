<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";
  import { KUMO_DROPDOWN_CONTENT_CLASS } from "./variants";

  export type DropdownMenuContentProps = DropdownMenuPrimitive.ContentProps & {
    container?: PortalProps["to"];
  };

  let {
    children,
    class: className,
    container,
    sideOffset = 8,
    ...restProps
  }: DropdownMenuContentProps = $props();

  const portalContext = getKumoPortalContext();
  let portalContainer = $derived(container ?? portalContext.container);
</script>

<DropdownMenuPrimitive.Portal to={portalContainer}>
  <DropdownMenuPrimitive.Content
    {sideOffset}
    class={cn(KUMO_DROPDOWN_CONTENT_CLASS, className)}
    {...restProps}
  >
    {@render children?.()}
  </DropdownMenuPrimitive.Content>
</DropdownMenuPrimitive.Portal>
