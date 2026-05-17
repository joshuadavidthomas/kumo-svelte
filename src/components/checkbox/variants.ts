import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_CHECKBOX_VARIANTS = {
  variant: {
    default: {
      classes: "[&:focus-within>span]:ring-kumo-focus [&:hover>span]:ring-kumo-hairline",
      description: "Default checkbox appearance",
    },
    error: {
      classes: "[&>span]:ring-kumo-danger",
      description: "Error state for validation failures",
    },
  },
} as const;

export const KUMO_CHECKBOX_DEFAULT_VARIANTS = {
  variant: "default",
} as const;

export type KumoCheckboxVariant = keyof typeof KUMO_CHECKBOX_VARIANTS.variant;
export type CheckboxVariant = KumoCheckboxVariant;

export interface KumoCheckboxVariantsProps {
  variant?: KumoCheckboxVariant;
}

export function checkboxVariants({
  variant = KUMO_CHECKBOX_DEFAULT_VARIANTS.variant,
}: KumoCheckboxVariantsProps = {}) {
  return cn(
    resolveVariant(KUMO_CHECKBOX_VARIANTS.variant, variant, KUMO_CHECKBOX_DEFAULT_VARIANTS.variant)
      .classes,
  );
}
