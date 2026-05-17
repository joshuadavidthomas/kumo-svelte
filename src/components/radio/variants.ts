import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_RADIO_VARIANTS = {
  variant: {
    default: {
      classes: "ring-kumo-hairline",
      description: "Default radio appearance",
    },
    error: {
      classes: "ring-kumo-danger",
      description: "Error state for validation failures",
    },
  },
  appearance: {
    default: {
      classes: "",
      description: "Standard inline radio item",
    },
    card: {
      classes:
        "rounded-lg border border-kumo-hairline bg-kumo-base p-3 transition-colors hover:bg-kumo-tint has-[[data-checked]]:border-kumo-interact has-[[data-checked]]:bg-kumo-tint",
      description: "Choice card appearance with border, padding, and highlighted selection state",
    },
  },
} as const;

export const KUMO_RADIO_DEFAULT_VARIANTS = {
  variant: "default",
  appearance: "default",
} as const;

export type KumoRadioVariant = keyof typeof KUMO_RADIO_VARIANTS.variant;
export type KumoRadioAppearance = keyof typeof KUMO_RADIO_VARIANTS.appearance;
export type RadioVariant = KumoRadioVariant;
export type RadioControlPosition = "start" | "end";

export interface KumoRadioVariantsProps {
  variant?: KumoRadioVariant;
  appearance?: KumoRadioAppearance;
}

export function radioVariants({
  variant = KUMO_RADIO_DEFAULT_VARIANTS.variant,
  appearance = KUMO_RADIO_DEFAULT_VARIANTS.appearance,
}: KumoRadioVariantsProps = {}) {
  return cn(
    resolveVariant(KUMO_RADIO_VARIANTS.variant, variant, KUMO_RADIO_DEFAULT_VARIANTS.variant)
      .classes,
    resolveVariant(
      KUMO_RADIO_VARIANTS.appearance,
      appearance,
      KUMO_RADIO_DEFAULT_VARIANTS.appearance,
    ).classes,
  );
}
