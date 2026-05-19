import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_PAGINATION_VARIANTS = {
  controls: {
    full: {
      classes: "",
      description:
        "Full pagination controls with first, previous, page input, next, and last buttons",
    },
    simple: {
      classes: "",
      description: "Simple pagination controls with only previous and next buttons",
    },
  },
} as const;

export const KUMO_PAGINATION_DEFAULT_VARIANTS = {
  controls: "full",
} as const;

export type KumoPaginationControls = keyof typeof KUMO_PAGINATION_VARIANTS.controls;

export interface KumoPaginationVariantsProps {
  controls?: KumoPaginationControls;
}

export function paginationVariants({
  controls = KUMO_PAGINATION_DEFAULT_VARIANTS.controls,
}: KumoPaginationVariantsProps = {}) {
  return cn(
    "flex items-center justify-between gap-2",
    resolveVariant(
      KUMO_PAGINATION_VARIANTS.controls,
      controls,
      KUMO_PAGINATION_DEFAULT_VARIANTS.controls,
    ).classes,
  );
}
