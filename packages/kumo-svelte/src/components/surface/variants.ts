import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_SURFACE_VARIANTS = {
  color: {
    primary: {
      classes: "",
      description: "Primary surface color",
    },
    secondary: {
      classes: "",
      description: "Secondary surface color",
    },
  },
} as const;

export const KUMO_SURFACE_DEFAULT_VARIANTS = {
  color: "primary",
} as const;

export type KumoSurfaceColor = keyof typeof KUMO_SURFACE_VARIANTS.color;

export interface KumoSurfaceVariantsProps {
  color?: KumoSurfaceColor;
}

export function surfaceVariants({
  color = KUMO_SURFACE_DEFAULT_VARIANTS.color,
}: KumoSurfaceVariantsProps = {}) {
  return resolveVariant(KUMO_SURFACE_VARIANTS.color, color, KUMO_SURFACE_DEFAULT_VARIANTS.color)
    .classes;
}
