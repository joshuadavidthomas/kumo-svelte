import type { ClassValue } from "clsx";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_TOOLBAR_VARIANTS = {
  size: {
    xs: {
      classes: "text-xs",
      description: "Extra small toolbar for compact UIs",
    },
    sm: {
      classes: "text-xs",
      description: "Small toolbar for secondary controls",
    },
    base: {
      classes: "text-base",
      description: "Default toolbar size",
    },
    lg: {
      classes: "text-base",
      description: "Large toolbar for prominent controls",
    },
  },
} as const;

export const KUMO_TOOLBAR_DEFAULT_VARIANTS = {
  size: "base",
} as const;

export type ToolbarSize = keyof typeof KUMO_TOOLBAR_VARIANTS.size;

export interface KumoToolbarVariantsProps {
  size?: ToolbarSize;
}

export function toolbarVariants({
  size = KUMO_TOOLBAR_DEFAULT_VARIANTS.size,
}: KumoToolbarVariantsProps = {}) {
  return cn(
    "inline-flex w-fit items-stretch rounded-lg bg-kumo-control shadow-xs ring ring-kumo-line",
    resolveVariant(KUMO_TOOLBAR_VARIANTS.size, size, KUMO_TOOLBAR_DEFAULT_VARIANTS.size).classes,
  );
}

export function toolbarControlClassName(className?: ClassValue) {
  return cn(
    "relative min-w-0 rounded-none border-0 bg-transparent shadow-none ring-0",
    "first:rounded-l-lg last:rounded-r-lg only:rounded-lg",
    "not-first:border-l not-first:border-kumo-line",
    "focus:z-2 focus-within:z-2 focus-visible:z-2",
    "focus:ring-kumo-focus/50 focus:ring-[1.5px] focus-visible:ring-2 focus-visible:ring-kumo-brand",
    className,
  );
}
