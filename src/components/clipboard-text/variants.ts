import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";
import type { KumoButtonSize } from "../button/variants";

export const KUMO_CLIPBOARD_TEXT_VARIANTS = {
  size: {
    sm: {
      classes: "text-xs",
      buttonSize: "sm",
      description: "Small clipboard text for compact UIs",
    },
    base: {
      classes: "text-sm",
      buttonSize: "base",
      description: "Default clipboard text size",
    },
    lg: {
      classes: "text-sm",
      buttonSize: "lg",
      description: "Large clipboard text for prominent display",
    },
  },
} as const;

export const KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS = {
  size: "lg",
} as const;

export type KumoClipboardTextSize = keyof typeof KUMO_CLIPBOARD_TEXT_VARIANTS.size;
export type ClipboardTextSize = KumoClipboardTextSize;

export interface KumoClipboardTextVariantsProps {
  size?: KumoClipboardTextSize;
}

export function clipboardTextVariants({
  size = KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS.size,
}: KumoClipboardTextVariantsProps = {}) {
  return cn(
    "flex items-center overflow-hidden bg-kumo-base px-0 font-mono",
    resolveVariant(
      KUMO_CLIPBOARD_TEXT_VARIANTS.size,
      size,
      KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS.size,
    ).classes,
  );
}

export function clipboardTextButtonSize(size: KumoClipboardTextSize): KumoButtonSize {
  return resolveVariant(
    KUMO_CLIPBOARD_TEXT_VARIANTS.size,
    size,
    KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS.size,
  ).buttonSize as KumoButtonSize;
}
