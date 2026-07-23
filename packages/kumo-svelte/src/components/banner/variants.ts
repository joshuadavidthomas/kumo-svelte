import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_BANNER_BASE_STYLES =
  "flex w-full items-start gap-3 rounded-lg px-4 py-3 text-base";

export const KUMO_BANNER_VARIANTS = {
  variant: {
    default: {
      classes: "bg-kumo-info-tint text-kumo-info",
      iconClasses: "fill-kumo-info",
      description: "Informational banner for general messages",
    },
    alert: {
      classes: "bg-kumo-warning-tint text-kumo-warning",
      iconClasses: "fill-kumo-warning",
      description: "Warning banner for cautionary messages",
    },
    error: {
      classes: "bg-kumo-danger-tint text-kumo-danger",
      iconClasses: "fill-kumo-danger",
      description: "Error banner for critical issues",
    },
    secondary: {
      classes: "bg-kumo-contrast/5 text-kumo-default/70",
      iconClasses: "fill-kumo-interact",
      description: "Neutral banner for secondary messages",
    },
  },
} as const;

export const KUMO_BANNER_DEFAULT_VARIANTS = {
  variant: "default",
} as const;

export type KumoBannerVariant = keyof typeof KUMO_BANNER_VARIANTS.variant;
export type BannerVariant = KumoBannerVariant;

export interface KumoBannerVariantsProps {
  variant?: KumoBannerVariant;
}

export function bannerVariants({
  variant = KUMO_BANNER_DEFAULT_VARIANTS.variant,
}: KumoBannerVariantsProps = {}) {
  return cn(
    KUMO_BANNER_BASE_STYLES,
    resolveVariant(KUMO_BANNER_VARIANTS.variant, variant, KUMO_BANNER_DEFAULT_VARIANTS.variant)
      .classes,
  );
}

export function bannerIconVariants({
  variant = KUMO_BANNER_DEFAULT_VARIANTS.variant,
}: KumoBannerVariantsProps = {}) {
  return resolveVariant(KUMO_BANNER_VARIANTS.variant, variant, KUMO_BANNER_DEFAULT_VARIANTS.variant)
    .iconClasses;
}
