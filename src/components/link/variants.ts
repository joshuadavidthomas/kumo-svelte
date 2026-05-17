import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_LINK_VARIANTS = {
  variant: {
    inline: {
      classes:
        "text-kumo-link underline underline-offset-[0.15em] decoration-[0.0625em] link-current transition-colors",
      description: "Inline text link that flows with content",
    },
    current: {
      classes:
        "text-current underline underline-offset-[0.15em] decoration-[0.0625em] link-current transition-colors",
      description: "Link that inherits color from parent text",
    },
    plain: {
      classes: "text-kumo-link hover:text-kumo-link/70 transition-colors",
      description: "Link without underline decoration",
    },
  },
} as const;

export const KUMO_LINK_DEFAULT_VARIANTS = {
  variant: "inline",
} as const;

export type KumoLinkVariant = keyof typeof KUMO_LINK_VARIANTS.variant;

export interface KumoLinkVariantsProps {
  variant?: KumoLinkVariant;
}

export function linkVariants({
  variant = KUMO_LINK_DEFAULT_VARIANTS.variant,
}: KumoLinkVariantsProps = {}) {
  return cn(
    resolveVariant(KUMO_LINK_VARIANTS.variant, variant, KUMO_LINK_DEFAULT_VARIANTS.variant).classes,
  );
}
