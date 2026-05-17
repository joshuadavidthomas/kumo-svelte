import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_SWITCH_VARIANTS = {
  size: {
    sm: {
      classes: "h-5.5 w-8.5",
      description: "Small switch for compact UIs",
    },
    base: {
      classes: "h-6.5 w-10.5",
      description: "Default switch size",
    },
    lg: {
      classes: "h-7.5 w-12.5",
      description: "Large switch for prominent toggles",
    },
  },
  variant: {
    default: {
      classes: "",
      description: "Default switch with squircle shape and brand blue color",
    },
    neutral: {
      classes: "",
      description: "Monochrome switch with squircle shape for subtle toggles",
    },
  },
} as const;

export const KUMO_SWITCH_DEFAULT_VARIANTS = {
  size: "base",
  variant: "default",
} as const;

export type KumoSwitchSize = keyof typeof KUMO_SWITCH_VARIANTS.size;
export type KumoSwitchVariant = keyof typeof KUMO_SWITCH_VARIANTS.variant;
export type SwitchSize = KumoSwitchSize;
export type SwitchVariant = KumoSwitchVariant;

export interface KumoSwitchVariantsProps {
  size?: KumoSwitchSize;
  variant?: KumoSwitchVariant;
}

export function switchVariants({
  size = KUMO_SWITCH_DEFAULT_VARIANTS.size,
  variant = KUMO_SWITCH_DEFAULT_VARIANTS.variant,
}: KumoSwitchVariantsProps = {}) {
  return cn(
    resolveVariant(KUMO_SWITCH_VARIANTS.size, size, KUMO_SWITCH_DEFAULT_VARIANTS.size).classes,
    resolveVariant(KUMO_SWITCH_VARIANTS.variant, variant, KUMO_SWITCH_DEFAULT_VARIANTS.variant)
      .classes,
  );
}

export const KUMO_SWITCH_SIZE_STYLES = {
  sm: { track: "h-4 w-8", thumb: "w-4", slide: "left-4" },
  base: { track: "h-4.5 w-9", thumb: "w-4.5", slide: "left-4.5" },
  lg: { track: "h-5 w-10", thumb: "w-5", slide: "left-5" },
} as const satisfies Record<KumoSwitchSize, { track: string; thumb: string; slide: string }>;
