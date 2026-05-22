import type { ComponentProps } from "svelte";
import TooltipContentComponent from "./tooltip-content.svelte";
import TooltipPortalComponent from "./tooltip-portal.svelte";
import TooltipProviderComponent from "./tooltip-provider.svelte";
import TooltipRootComponent from "./tooltip-root.svelte";
import TooltipTriggerComponent from "./tooltip-trigger.svelte";
import TooltipComponent from "./tooltip.svelte";

const Tooltip = Object.assign(TooltipComponent, {
  Root: TooltipRootComponent,
  Trigger: TooltipTriggerComponent,
  Portal: TooltipPortalComponent,
  Content: TooltipContentComponent,
  Provider: TooltipProviderComponent,
});

export {
  Tooltip,
  TooltipRootComponent as TooltipRoot,
  TooltipRootComponent as Root,
  TooltipTriggerComponent as TooltipTrigger,
  TooltipTriggerComponent as Trigger,
  TooltipPortalComponent as TooltipPortal,
  TooltipPortalComponent as Portal,
  TooltipContentComponent as TooltipContent,
  TooltipContentComponent as Content,
  TooltipProviderComponent as TooltipProvider,
  TooltipProviderComponent as Provider,
};

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
