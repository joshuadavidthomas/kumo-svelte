import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_EMPTY_VARIANTS = {
  size: {
    sm: {
      classes: "px-6 py-8 gap-4",
      description: "Compact empty state for smaller containers",
    },
    base: {
      classes: "px-10 py-16 gap-6",
      description: "Default empty state size",
    },
    lg: {
      classes: "px-12 py-20 gap-8",
      description: "Large empty state for prominent placement",
    },
  },
} as const;

export const KUMO_EMPTY_DEFAULT_VARIANTS = {
  size: "base",
} as const;

export type KumoEmptySize = keyof typeof KUMO_EMPTY_VARIANTS.size;

export interface KumoEmptyVariantsProps {
  size?: KumoEmptySize;
}

export function emptyVariants({
  size = KUMO_EMPTY_DEFAULT_VARIANTS.size,
}: KumoEmptyVariantsProps = {}) {
  return cn(
    "flex w-full flex-col items-center rounded-xl border border-kumo-fill bg-kumo-control text-kumo-default",
    resolveVariant(KUMO_EMPTY_VARIANTS.size, size, KUMO_EMPTY_DEFAULT_VARIANTS.size).classes,
  );
}
