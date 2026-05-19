import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_BADGE_BASE_STYLES =
  "inline-flex w-fit flex-none shrink-0 items-center justify-self-start rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap";

export const KUMO_BADGE_VARIANTS = {
  variant: {
    primary: {
      classes: "bg-kumo-badge-inverted text-kumo-badge-inverted",
      description: "Primary badge",
    },
    secondary: {
      classes: "bg-kumo-fill text-kumo-badge-neutral-subtle",
      description: "Secondary badge",
    },
    error: {
      classes: "bg-kumo-danger-tint/60 text-kumo-danger",
      description: "Error badge",
    },
    warning: {
      classes: "bg-kumo-warning-tint/70 text-kumo-warning",
      description: "Warning badge",
    },
    success: {
      classes: "bg-kumo-success-tint/70 text-kumo-success",
      description: "Success badge",
    },
    destructive: {
      classes: "bg-kumo-badge-red text-white",
      description: "Deprecated. Use red instead.",
    },
    info: {
      classes: "bg-kumo-info-tint/70 text-kumo-info",
      description: "Info badge",
    },
    beta: {
      classes: "border border-dashed border-kumo-brand bg-transparent text-kumo-link",
      description: "Indicates beta or experimental features",
    },
    outline: {
      classes: "border border-kumo-fill bg-transparent text-kumo-default",
      description: "Bordered badge with transparent background",
    },
    red: {
      classes: "bg-kumo-badge-red text-white",
      description: "Red badge",
    },
    green: {
      classes: "bg-kumo-badge-green text-white",
      description: "Green badge",
    },
    neutral: {
      classes: "bg-kumo-badge-neutral text-white",
      description: "Neutral badge",
    },
    orange: {
      classes: "bg-kumo-badge-orange text-black",
      description: "Orange badge",
    },
    purple: {
      classes: "bg-kumo-badge-purple text-white",
      description: "Purple badge",
    },
    teal: {
      classes: "bg-kumo-badge-teal text-white",
      description: "Teal badge",
    },
    "teal-subtle": {
      classes: "bg-kumo-badge-teal-subtle text-kumo-badge-teal-subtle",
      description: "Subtle teal badge",
    },
    blue: {
      classes: "bg-kumo-badge-blue text-white",
      description: "Blue badge",
    },
  },
} as const;

export const KUMO_BADGE_DEFAULT_VARIANTS = {
  variant: "primary",
} as const;

export type KumoBadgeVariant = keyof typeof KUMO_BADGE_VARIANTS.variant;
export type BadgeVariant = KumoBadgeVariant;

export interface KumoBadgeVariantsProps {
  variant?: KumoBadgeVariant;
}

export function badgeVariants({
  variant = KUMO_BADGE_DEFAULT_VARIANTS.variant,
}: KumoBadgeVariantsProps = {}) {
  return cn(
    KUMO_BADGE_BASE_STYLES,
    resolveVariant(KUMO_BADGE_VARIANTS.variant, variant, KUMO_BADGE_DEFAULT_VARIANTS.variant)
      .classes,
  );
}
