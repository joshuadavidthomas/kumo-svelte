import type { ComponentProps } from "svelte";
import TooltipContentComponent from "./tooltip-content.svelte";
import TooltipPortalComponent from "./tooltip-portal.svelte";
import TooltipProviderComponent from "./tooltip-provider.svelte";
import TooltipRootComponent from "./tooltip-root.svelte";
import TooltipTriggerComponent from "./tooltip-trigger.svelte";
import TooltipComponent from "./tooltip.svelte";

export { default as Tooltip } from "./tooltip.svelte";
export { default as TooltipRoot } from "./tooltip-root.svelte";
export { default as TooltipTrigger } from "./tooltip-trigger.svelte";
export { default as TooltipPortal } from "./tooltip-portal.svelte";
export { default as TooltipContent } from "./tooltip-content.svelte";
export { default as TooltipProvider } from "./tooltip-provider.svelte";
export type TooltipProps = ComponentProps<typeof TooltipComponent>;
export type TooltipRootProps = ComponentProps<typeof TooltipRootComponent>;
export type TooltipTriggerProps = ComponentProps<typeof TooltipTriggerComponent>;
export type TooltipPortalProps = ComponentProps<typeof TooltipPortalComponent>;
export type TooltipContentProps = ComponentProps<typeof TooltipContentComponent>;
export type TooltipProviderProps = ComponentProps<typeof TooltipProviderComponent>;
export {
  tooltipVariants,
  KUMO_TOOLTIP_DEFAULT_VARIANTS,
  KUMO_TOOLTIP_VARIANTS,
  type KumoTooltipAlign,
  type KumoTooltipSide,
  type KumoTooltipVariantsProps,
} from "./variants";
