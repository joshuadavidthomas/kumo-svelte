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
    arrow?: boolean;
    container?: PortalProps["to"];
    side?: KumoTooltipSide;
  };

  let {
    children,
    class: className,
    arrow = true,
    container,
    side = KUMO_TOOLTIP_DEFAULT_VARIANTS.side,
    align = "center",
    sideOffset = -1,
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
    {#if arrow}
      <TooltipPrimitive.Arrow data-slot="tooltip-arrow" class="z-10 flex [&>svg]:-translate-y-0.5" width={20} height={10}>
        <ArrowSvg />
      </TooltipPrimitive.Arrow>
    {/if}
    {@render children?.()}
  </TooltipPrimitive.Content>
</TooltipPortal>
