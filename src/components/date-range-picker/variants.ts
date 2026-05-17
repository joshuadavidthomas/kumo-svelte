import { cn, resolveVariant } from "../../utils";

export const KUMO_DATE_RANGE_PICKER_VARIANTS = {
  size: {
    sm: {
      classes: "gap-2 p-3 text-xs",
      description: "Compact calendar for tight spaces",
    },
    base: {
      classes: "gap-2.5 p-4 text-sm",
      description: "Default calendar size",
    },
    lg: {
      classes: "gap-3 p-5 text-base",
      description: "Large calendar for prominent date selection",
    },
  },
  variant: {
    default: {
      classes: "bg-kumo-overlay",
      description: "Default calendar appearance",
    },
    subtle: {
      classes: "bg-kumo-base",
      description: "Subtle calendar with minimal background",
    },
  },
} as const;

export const KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS = {
  size: "base",
  variant: "default",
} as const;

export type KumoDateRangePickerSize = keyof typeof KUMO_DATE_RANGE_PICKER_VARIANTS.size;
export type KumoDateRangePickerVariant = keyof typeof KUMO_DATE_RANGE_PICKER_VARIANTS.variant;

export interface KumoDateRangePickerVariantsProps {
  size?: KumoDateRangePickerSize;
  variant?: KumoDateRangePickerVariant;
}

export function dateRangePickerVariants({
  size = KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS.size,
  variant = KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS.variant,
}: KumoDateRangePickerVariantsProps = {}) {
  return cn(
    "flex w-fit flex-col rounded-xl select-none",
    resolveVariant(
      KUMO_DATE_RANGE_PICKER_VARIANTS.variant,
      variant,
      KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS.variant,
    ).classes,
    resolveVariant(
      KUMO_DATE_RANGE_PICKER_VARIANTS.size,
      size,
      KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS.size,
    ).classes,
  );
}
