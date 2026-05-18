<script lang="ts">
  import { Tooltip as TooltipPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import ArrowSvg from "./arrow-svg.svelte";
  import TooltipPortal from "./tooltip-portal.svelte";
  import {
    KUMO_TOOLTIP_DEFAULT_VARIANTS,
    tooltipVariants,
    type KumoTooltipAlign,
    type KumoTooltipSide,
  } from "./variants";

  export type TooltipContentProps = Omit<TooltipPrimitive.ContentProps, "align" | "side"> & {
    align?: KumoTooltipAlign;
    container?: PortalProps["to"];
    side?: KumoTooltipSide;
  };

  let {
    children,
    class: className,
    container,
    side = KUMO_TOOLTIP_DEFAULT_VARIANTS.side,
    align = "center",
    sideOffset = 10,
    ...restProps
  }: TooltipContentProps = $props();
</script>

<TooltipPortal to={container}>
  <TooltipPrimitive.Content
    data-slot="tooltip-content"
    {side}
    {align}
    {sideOffset}
    class={cn(tooltipVariants({ side }), "kumo-tooltip-popup", className)}
    {...restProps}
  >
    <TooltipPrimitive.Arrow
      class={cn(
        "flex",
        "data-[side=bottom]:top-[-8px]",
        "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
        "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
        "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
      )}
    >
      <ArrowSvg />
    </TooltipPrimitive.Arrow>
    {@render children?.()}
  </TooltipPrimitive.Content>
</TooltipPortal>
