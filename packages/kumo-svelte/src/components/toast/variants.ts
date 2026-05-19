import { cn, resolveVariant } from "../../utils";

export const KUMO_TOAST_VARIANTS = {
  root: {
    classes: "rounded-xl border border-kumo-fill bg-kumo-base p-4 text-kumo-default shadow-lg",
    description: "Toast container with background, border, and shadow",
  },
  title: {
    classes: "text-[0.975rem] leading-5 font-medium text-kumo-default",
    description: "Toast title with primary text color",
  },
  description: {
    classes: "text-[0.925rem] leading-5 text-kumo-subtle",
    description: "Toast description with muted text color",
  },
  close: {
    classes:
      "absolute right-2 top-2 flex size-5 items-center justify-center rounded bg-transparent text-kumo-subtle hover:bg-kumo-fill-hover hover:text-kumo-default",
    description: "Close button with X icon",
  },
  variant: {
    default: {
      classes: "border-kumo-fill bg-kumo-base",
      description: "Default toast style",
    },
    success: {
      classes:
        "ring-[0.3px] ring-kumo-success [&_[data-icon]]:text-kumo-success [&_[data-title]]:text-kumo-success",
      description: "Success toast for confirmations and positive outcomes",
    },
    error: {
      classes:
        "ring-[0.3px] ring-kumo-danger [&_[data-icon]]:text-kumo-danger [&_[data-title]]:text-kumo-danger",
      description: "Error toast for critical issues",
    },
    warning: {
      classes:
        "ring-[0.3px] ring-kumo-warning [&_[data-icon]]:text-kumo-warning [&_[data-title]]:text-kumo-warning",
      description: "Warning toast for cautionary messages",
    },
    info: {
      classes:
        "ring-[0.3px] ring-kumo-info [&_[data-icon]]:text-kumo-info [&_[data-title]]:text-kumo-info",
      description: "Info toast for neutral informational messages",
    },
  },
} as const;

export const KUMO_TOAST_DEFAULT_VARIANTS = {
  variant: "default",
} as const;

export const KUMO_TOAST_STYLING = {
  container: {
    width: 356,
    padding: 16,
    borderRadius: 12,
    background: "bg-kumo-base",
    border: "border-kumo-fill",
    shadow: "shadow-lg",
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "text-kumo-default",
  },
  description: {
    fontSize: 15,
    fontWeight: 400,
    color: "text-kumo-subtle",
  },
  closeButton: {
    size: 20,
    iconSize: 16,
    iconName: "ph-x",
    iconColor: "text-kumo-subtle",
    hoverBackground: "bg-kumo-fill-hover",
    hoverColor: "text-kumo-default",
    borderRadius: 4,
  },
} as const;

export type KumoToastVariant = keyof typeof KUMO_TOAST_VARIANTS.variant;

export interface KumoToastVariantsProps {
  variant?: KumoToastVariant;
}

export function toastVariants({
  variant = KUMO_TOAST_DEFAULT_VARIANTS.variant,
}: KumoToastVariantsProps = {}) {
  return cn(
    "rounded-xl bg-clip-padding p-4 shadow-lg",
    resolveVariant(KUMO_TOAST_VARIANTS.variant, variant, KUMO_TOAST_DEFAULT_VARIANTS.variant)
      .classes,
  );
}
