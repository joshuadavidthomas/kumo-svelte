<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import DropdownMenuPortal from "./dropdown-portal.svelte";
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
</script>

<DropdownMenuPortal to={container}>
  <DropdownMenuPrimitive.Content
    data-slot="dropdown-menu-content"
    {sideOffset}
    class={cn(KUMO_DROPDOWN_CONTENT_CLASS, className)}
    {...restProps}
  >
    {@render children?.()}
  </DropdownMenuPrimitive.Content>
</DropdownMenuPortal>
