import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_DIALOG_VARIANTS = {
  size: {
    base: {
      classes: "sm:min-w-96",
      description: "Default dialog width",
    },
    sm: {
      classes: "min-w-72",
      description: "Small dialog for simple confirmations",
    },
    lg: {
      classes: "min-w-[32rem]",
      description: "Large dialog for complex content",
    },
    xl: {
      classes: "min-w-[48rem]",
      description: "Extra large dialog for detailed views",
    },
  },
  role: {
    dialog: {
      classes: "",
      description: "Standard dialog for general-purpose modals",
    },
    alertdialog: {
      classes: "",
      description: "Alert dialog for confirmation flows requiring explicit user acknowledgment",
    },
  },
} as const;

export const KUMO_DIALOG_DEFAULT_VARIANTS = {
  size: "base",
  role: "dialog",
} as const;

export const KUMO_DIALOG_STYLING = {
  dimensions: {
    sm: {
      width: 350,
      titleSize: 20,
      descSize: 16,
      padding: 16,
      gap: 8,
      buttonSize: "sm",
    },
    base: {
      width: 384,
      titleSize: 20,
      descSize: 16,
      padding: 24,
      gap: 16,
      buttonSize: "base",
    },
    lg: {
      width: 512,
      titleSize: 20,
      descSize: 16,
      padding: 24,
      gap: 16,
      buttonSize: "base",
    },
    xl: {
      width: 768,
      titleSize: 20,
      descSize: 16,
      padding: 24,
      gap: 16,
      buttonSize: "base",
    },
  },
  baseTokens: {
    background: "color-surface",
    text: "text-color-surface",
    borderRadius: 12,
    shadow: "shadow-m",
  },
  backdrop: {
    background: "color-surface-secondary",
    opacity: 0.8,
  },
  header: {
    title: { fontWeight: 600, color: "text-color-surface" },
    closeIcon: { name: "ph-x", size: 20, color: "text-color-muted" },
  },
  description: {
    fontWeight: 400,
    color: "text-color-muted",
  },
  buttons: {
    primary: { background: "color-primary", text: "white" },
    secondary: { ring: "color-border", text: "text-color-surface" },
  },
} as const;

export type KumoDialogSize = keyof typeof KUMO_DIALOG_VARIANTS.size;
export type KumoDialogRole = keyof typeof KUMO_DIALOG_VARIANTS.role;

export interface KumoDialogVariantsProps {
  size?: KumoDialogSize;
}

export function dialogVariants({
  size = KUMO_DIALOG_DEFAULT_VARIANTS.size,
}: KumoDialogVariantsProps = {}) {
  return cn(
    "shadow-xs shadow-m ring ring-kumo-line fixed top-1/2 left-1/2 z-50 w-full sm:w-auto max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-kumo-base text-kumo-default duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
    resolveVariant(KUMO_DIALOG_VARIANTS.size, size, KUMO_DIALOG_DEFAULT_VARIANTS.size).classes,
  );
}
