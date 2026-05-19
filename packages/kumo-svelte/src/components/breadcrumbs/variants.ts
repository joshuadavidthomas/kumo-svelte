import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_BREADCRUMBS_VARIANTS = {
  size: {
    sm: {
      classes: "text-sm h-10 gap-0.5",
      description: "Compact breadcrumbs for dense UIs",
    },
    base: {
      classes: "text-base h-12 gap-1",
      description: "Default breadcrumbs size",
    },
  },
} as const;

export const KUMO_BREADCRUMBS_DEFAULT_VARIANTS = {
  size: "base",
} as const;

export type KumoBreadcrumbsSize = keyof typeof KUMO_BREADCRUMBS_VARIANTS.size;

export interface KumoBreadcrumbsVariantsProps {
  size?: KumoBreadcrumbsSize;
}

export function breadcrumbsVariants({
  size = KUMO_BREADCRUMBS_DEFAULT_VARIANTS.size,
}: KumoBreadcrumbsVariantsProps = {}) {
  return cn(
    "group mr-4 flex min-w-0 grow items-center overflow-hidden whitespace-nowrap",
    resolveVariant(KUMO_BREADCRUMBS_VARIANTS.size, size, KUMO_BREADCRUMBS_DEFAULT_VARIANTS.size)
      .classes,
  );
}
