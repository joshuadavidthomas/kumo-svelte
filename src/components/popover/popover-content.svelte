<script lang="ts">
  import { Popover as PopoverPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import ArrowSvg from "../tooltip/arrow-svg.svelte";
  import PopoverPortal from "./popover-portal.svelte";
  import {
    KUMO_POPOVER_DEFAULT_VARIANTS,
    popoverVariants,
    type KumoPopoverAlign,
    type KumoPopoverSide,
  } from "./variants";

  export type PopoverContentProps = Omit<
    PopoverPrimitive.ContentProps,
    "align" | "customAnchor" | "side" | "strategy"
  > & {
    align?: KumoPopoverAlign;
    anchor?: PopoverPrimitive.ContentProps["customAnchor"];
    container?: PortalProps["to"];
    positionMethod?: "absolute" | "fixed";
    side?: KumoPopoverSide;
  };

  let {
    children,
    class: className,
    side = KUMO_POPOVER_DEFAULT_VARIANTS.side,
    align = "center",
    sideOffset = 8,
    alignOffset = 0,
    positionMethod = "absolute",
    anchor,
    container,
    ...restProps
  }: PopoverContentProps = $props();
</script>

<PopoverPortal to={container}>
  <PopoverPrimitive.Content
    data-slot="popover-content"
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    customAnchor={anchor}
    strategy={positionMethod}
    class={cn(popoverVariants({ side }), "kumo-popover-popup", className)}
    {...restProps}
  >
    <PopoverPrimitive.Arrow class="z-10 flex [&>svg]:-translate-y-0.5" width={20} height={10}>
      <ArrowSvg />
    </PopoverPrimitive.Arrow>
    {@render children?.()}
  </PopoverPrimitive.Content>
</PopoverPortal>
