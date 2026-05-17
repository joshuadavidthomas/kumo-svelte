import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_TABLE_VARIANTS = {
  layout: {
    auto: {
      classes: "",
      description: "Auto table layout - columns resize based on content",
    },
    fixed: {
      classes: "table-fixed",
      description: "Fixed table layout - columns have equal width, controlled via colgroup",
    },
  },
  variant: {
    default: {
      classes: "",
      description: "Default row variant",
    },
    selected: {
      classes: "bg-kumo-tint",
      description: "Selected row variant",
    },
  },
  sticky: {
    left: {
      classes: "sticky left-0",
      description: "Pin column to the left edge of the scroll container",
    },
    right: {
      classes: "sticky right-0",
      description: "Pin column to the right edge of the scroll container",
    },
  },
} as const;

export const KUMO_TABLE_DEFAULT_VARIANTS = {
  layout: "auto",
  variant: "default",
} as const;

export type KumoTableLayout = keyof typeof KUMO_TABLE_VARIANTS.layout;
export type KumoTableRowVariant = keyof typeof KUMO_TABLE_VARIANTS.variant;
export type KumoTableStickyColumn = keyof typeof KUMO_TABLE_VARIANTS.sticky;

export interface KumoTableVariantsProps {
  layout?: KumoTableLayout;
}

export interface KumoTableRowVariantsProps {
  variant?: KumoTableRowVariant;
}

export function tableVariants({
  layout = KUMO_TABLE_DEFAULT_VARIANTS.layout,
}: KumoTableVariantsProps = {}) {
  return cn(
    "isolate w-full",
    resolveVariant(KUMO_TABLE_VARIANTS.layout, layout, KUMO_TABLE_DEFAULT_VARIANTS.layout).classes,
    "[&_td]:border-b [&_td]:border-kumo-fill [&_tr:last-child_td]:border-b-0",
    "[&_td]:p-3",
    "[&_th]:border-b [&_th]:border-kumo-fill [&_th]:p-3 [&_th]:font-semibold [&_th]:text-base",
    "[&_th]:bg-kumo-base",
    "text-base text-left text-kumo-default",
  );
}

export function tableRowVariants({
  variant = KUMO_TABLE_DEFAULT_VARIANTS.variant,
}: KumoTableRowVariantsProps = {}) {
  return resolveVariant(KUMO_TABLE_VARIANTS.variant, variant, KUMO_TABLE_DEFAULT_VARIANTS.variant)
    .classes;
}

export function stickyColumnClasses(side: KumoTableStickyColumn, element: "head" | "cell") {
  const base = resolveVariant(KUMO_TABLE_VARIANTS.sticky, side, "left").classes;
  const z = element === "head" ? "z-2" : "z-1";
  const fadePosition = side === "right" ? "before:-left-6" : "before:-right-6";
  const fadeBase = "before:pointer-events-none before:absolute before:inset-y-0 before:w-6";

  if (element === "cell") {
    const fade =
      side === "right"
        ? "before:bg-gradient-to-r before:from-transparent before:to-kumo-base"
        : "before:bg-gradient-to-l before:from-transparent before:to-kumo-base";

    return cn(base, z, "bg-kumo-base", fadeBase, fadePosition, fade);
  }

  const bg = "bg-kumo-base group-data-[compact]/header:bg-kumo-elevated";
  const fade =
    side === "right"
      ? "before:bg-gradient-to-r before:from-transparent before:to-kumo-base group-data-[compact]/header:before:to-kumo-elevated"
      : "before:bg-gradient-to-l before:from-transparent before:to-kumo-base group-data-[compact]/header:before:to-kumo-elevated";

  return cn(base, z, bg, fadeBase, fadePosition, fade);
}
