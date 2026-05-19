import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_POPOVER_VARIANTS = {
  side: {
    top: {
      classes: "",
      description: "Popover appears above the trigger",
    },
    bottom: {
      classes: "",
      description: "Popover appears below the trigger",
    },
    left: {
      classes: "",
      description: "Popover appears to the left of the trigger",
    },
    right: {
      classes: "",
      description: "Popover appears to the right of the trigger",
    },
  },
} as const;

export const KUMO_POPOVER_DEFAULT_VARIANTS = {
  side: "bottom",
} as const;

export type KumoPopoverSide = keyof typeof KUMO_POPOVER_VARIANTS.side;
export type KumoPopoverAlign = "start" | "center" | "end";

export interface KumoPopoverVariantsProps {
  side?: KumoPopoverSide;
}

export function popoverVariants({
  side = KUMO_POPOVER_DEFAULT_VARIANTS.side,
}: KumoPopoverVariantsProps = {}) {
  return cn(
    "flex origin-[var(--bits-popover-content-transform-origin)] flex-col rounded-lg bg-kumo-base px-4 py-3 text-sm text-kumo-default",
    "shadow-lg shadow-kumo-tip-shadow outline outline-1 outline-kumo-fill",
    "transition-[transform,scale,opacity] duration-150",
    "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
    "data-[instant]:duration-0",
    resolveVariant(KUMO_POPOVER_VARIANTS.side, side, KUMO_POPOVER_DEFAULT_VARIANTS.side).classes,
  );
}
