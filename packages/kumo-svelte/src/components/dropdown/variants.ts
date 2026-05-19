import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_DROPDOWN_VARIANTS = {
  variant: {
    default: {
      classes: "",
      description: "Default dropdown item appearance",
    },
    danger: {
      classes:
        "text-kumo-danger data-[highlighted]:bg-kumo-danger/5 data-[highlighted]:text-kumo-danger",
      description: "Destructive action item",
    },
  },
} as const;

export const KUMO_DROPDOWN_DEFAULT_VARIANTS = {
  variant: "default",
} as const;

export type KumoDropdownVariant = keyof typeof KUMO_DROPDOWN_VARIANTS.variant;

export interface KumoDropdownVariantsProps {
  variant?: KumoDropdownVariant;
}

export function dropdownVariants({
  variant = KUMO_DROPDOWN_DEFAULT_VARIANTS.variant,
}: KumoDropdownVariantsProps = {}) {
  return cn(
    resolveVariant(KUMO_DROPDOWN_VARIANTS.variant, variant, KUMO_DROPDOWN_DEFAULT_VARIANTS.variant)
      .classes,
  );
}

export const KUMO_DROPDOWN_CONTENT_CLASS = cn(
  "overflow-hidden bg-kumo-control text-kumo-default",
  "rounded-lg shadow-lg ring ring-kumo-line",
  "min-w-36 p-1.5",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2",
  "data-[side=top]:slide-in-from-bottom-2",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
);

export const KUMO_DROPDOWN_ITEM_CLASS = cn(
  "relative flex cursor-default items-center rounded-md px-2 py-1.5 text-base outline-none select-none",
  "focus:text-kumo-default focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-kumo-overlay",
);
