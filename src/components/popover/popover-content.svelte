<script lang="ts">
  import { Popover as PopoverPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";
  import ArrowSvg from "../tooltip/arrow-svg.svelte";
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

  const portalContext = getKumoPortalContext();
  let portalContainer = $derived(container ?? portalContext.container);
</script>

<PopoverPrimitive.Portal to={portalContainer}>
  <PopoverPrimitive.Content
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    customAnchor={anchor}
    strategy={positionMethod}
    class={cn(popoverVariants({ side }), "kumo-popover-popup", className)}
    {...restProps}
  >
    <PopoverPrimitive.Arrow
      class={cn(
        "flex",
        "data-[side=bottom]:-top-2",
        "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
        "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
        "data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
      )}
    >
      <ArrowSvg />
    </PopoverPrimitive.Arrow>
    {@render children?.()}
  </PopoverPrimitive.Content>
</PopoverPrimitive.Portal>
