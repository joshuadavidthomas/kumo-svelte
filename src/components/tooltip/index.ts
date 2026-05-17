import type { ComponentProps } from "svelte";
import TooltipProviderComponent from "./tooltip-provider.svelte";
import TooltipComponent from "./tooltip.svelte";

export { default as Tooltip } from "./tooltip.svelte";
export { default as TooltipProvider } from "./tooltip-provider.svelte";
export type TooltipProps = ComponentProps<typeof TooltipComponent>;
export type TooltipProviderProps = ComponentProps<typeof TooltipProviderComponent>;
export {
  tooltipVariants,
  KUMO_TOOLTIP_DEFAULT_VARIANTS,
  KUMO_TOOLTIP_VARIANTS,
  type KumoTooltipAlign,
  type KumoTooltipSide,
  type KumoTooltipVariantsProps,
} from "./variants";
