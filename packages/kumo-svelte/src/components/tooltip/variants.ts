import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_TOOLTIP_VARIANTS = {
  side: {
    top: {
      classes: "",
      description: "Tooltip appears above the trigger",
    },
    bottom: {
      classes: "",
      description: "Tooltip appears below the trigger",
    },
    left: {
      classes: "",
      description: "Tooltip appears to the left of the trigger",
    },
    right: {
      classes: "",
      description: "Tooltip appears to the right of the trigger",
    },
  },
} as const;

export const KUMO_TOOLTIP_DEFAULT_VARIANTS = {
  side: "top",
} as const;

export type KumoTooltipSide = keyof typeof KUMO_TOOLTIP_VARIANTS.side;
export type KumoTooltipAlign = "start" | "center" | "end";

export interface KumoTooltipVariantsProps {
  side?: KumoTooltipSide;
}

export function tooltipVariants({
  side = KUMO_TOOLTIP_DEFAULT_VARIANTS.side,
}: KumoTooltipVariantsProps = {}) {
  return cn(
    "flex origin-[var(--bits-tooltip-content-transform-origin)] flex-col rounded-md bg-kumo-base px-2.5 py-1.5 text-sm text-kumo-default",
    "shadow-lg shadow-kumo-tip-shadow outline outline-1 outline-kumo-fill",
    "transition-[transform,scale,opacity] duration-150",
    "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
    "data-[instant]:duration-0",
    resolveVariant(KUMO_TOOLTIP_VARIANTS.side, side, KUMO_TOOLTIP_DEFAULT_VARIANTS.side).classes,
  );
}
