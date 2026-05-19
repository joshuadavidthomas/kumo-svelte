import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_BUTTON_VARIANTS = {
  shape: {
    base: {
      classes: "",
      description: "Default rectangular button shape",
    },
    square: {
      classes: "items-center justify-center p-0",
      description: "Square button for icon-only actions",
    },
    circle: {
      classes: "items-center justify-center p-0 rounded-full",
      description: "Circular button for icon-only actions",
    },
  },
  size: {
    xs: {
      classes: "h-5 gap-1 rounded-sm px-1.5 text-xs",
      description: "Extra small button for compact UIs",
    },
    sm: {
      classes: "h-6.5 gap-1 rounded-md px-2 text-xs",
      description: "Small button for secondary actions",
    },
    base: {
      classes: "h-9 gap-1.5 rounded-lg px-3 text-base",
      description: "Default button size",
    },
    lg: {
      classes: "h-10 gap-2 rounded-lg px-4 text-base",
      description: "Large button for primary CTAs",
    },
  },
  compactSize: {
    xs: { classes: "size-3.5" },
    sm: { classes: "size-6.5" },
    base: { classes: "size-9" },
    lg: { classes: "size-10" },
  },
  variant: {
    primary: {
      classes: "bg-kumo-brand !text-white hover:bg-kumo-brand-hover disabled:bg-kumo-brand/50",
      description: "High-emphasis button for primary actions",
    },
    secondary: {
      classes:
        "bg-kumo-base !text-kumo-default ring not-disabled:hover:bg-kumo-tint disabled:bg-kumo-base/50 disabled:!text-kumo-default/70 ring-kumo-hairline data-[state=open]:bg-kumo-base",
      description: "Default button style for most actions",
    },
    ghost: {
      classes: "text-kumo-default hover:bg-kumo-tint shadow-none bg-inherit",
      description: "Minimal button with no background",
    },
    destructive: {
      classes: "bg-kumo-danger !text-white hover:bg-kumo-danger/70",
      description: "Danger button for destructive actions like delete",
    },
    "secondary-destructive": {
      classes:
        "bg-kumo-base !text-kumo-danger ring not-disabled:hover:bg-kumo-base disabled:bg-kumo-base/50 disabled:!text-kumo-danger/70 ring-kumo-hairline data-[state=open]:bg-kumo-base",
      description: "Secondary button with destructive text for less prominent dangerous actions",
    },
    outline: {
      classes: "bg-transparent text-kumo-default ring ring-kumo-hairline",
      description: "Bordered button with transparent background",
    },
  },
} as const;

export const KUMO_BUTTON_DEFAULT_VARIANTS = {
  shape: "base",
  size: "base",
  variant: "secondary",
} as const;

export type KumoButtonShape = keyof typeof KUMO_BUTTON_VARIANTS.shape;
export type KumoButtonSize = keyof typeof KUMO_BUTTON_VARIANTS.size;
export type KumoButtonVariant = keyof typeof KUMO_BUTTON_VARIANTS.variant;

export interface KumoButtonVariantsProps {
  shape?: KumoButtonShape;
  size?: KumoButtonSize;
  variant?: KumoButtonVariant;
}

export function buttonVariants({
  variant = KUMO_BUTTON_DEFAULT_VARIANTS.variant,
  size = KUMO_BUTTON_DEFAULT_VARIANTS.size,
  shape = KUMO_BUTTON_DEFAULT_VARIANTS.shape,
}: KumoButtonVariantsProps = {}) {
  const isCompactShape = shape === "square" || shape === "circle";

  return cn(
    "group flex w-max shrink-0 items-center font-medium select-none",
    "border-0 shadow-xs",
    "focus:outline-none focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand",
    "cursor-pointer",
    "disabled:cursor-not-allowed disabled:text-kumo-subtle",
    resolveVariant(KUMO_BUTTON_VARIANTS.variant, variant, KUMO_BUTTON_DEFAULT_VARIANTS.variant)
      .classes,
    resolveVariant(KUMO_BUTTON_VARIANTS.size, size, KUMO_BUTTON_DEFAULT_VARIANTS.size).classes,
    resolveVariant(KUMO_BUTTON_VARIANTS.shape, shape, KUMO_BUTTON_DEFAULT_VARIANTS.shape).classes,
    isCompactShape &&
      resolveVariant(KUMO_BUTTON_VARIANTS.compactSize, size, KUMO_BUTTON_DEFAULT_VARIANTS.size)
        .classes,
  );
}
