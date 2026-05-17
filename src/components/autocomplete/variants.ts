import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";
import { KUMO_INPUT_VARIANTS } from "../input";

export const KUMO_AUTOCOMPLETE_VARIANTS = {
  size: KUMO_INPUT_VARIANTS.size,
} as const;

export const KUMO_AUTOCOMPLETE_DEFAULT_VARIANTS = {
  size: "base",
} as const;

export type KumoAutocompleteSize = keyof typeof KUMO_AUTOCOMPLETE_VARIANTS.size;

export interface KumoAutocompleteVariantsProps {
  size?: KumoAutocompleteSize;
}

export function autocompleteVariants({
  size = KUMO_AUTOCOMPLETE_DEFAULT_VARIANTS.size,
}: KumoAutocompleteVariantsProps = {}) {
  return cn(
    resolveVariant(KUMO_AUTOCOMPLETE_VARIANTS.size, size, KUMO_AUTOCOMPLETE_DEFAULT_VARIANTS.size)
      .classes,
  );
}
