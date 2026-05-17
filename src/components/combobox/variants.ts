import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";
import { KUMO_INPUT_VARIANTS } from "../input";

export const KUMO_COMBOBOX_VARIANTS = {
  size: KUMO_INPUT_VARIANTS.size,
  inputSide: {
    right: {
      classes: "",
      description: "Input positioned inline to the right of chips",
    },
    top: {
      classes: "",
      description: "Input positioned above chips",
    },
  },
} as const;

export const KUMO_COMBOBOX_DEFAULT_VARIANTS = {
  size: "base",
  inputSide: "right",
} as const;

export type KumoComboboxSize = keyof typeof KUMO_COMBOBOX_VARIANTS.size;
export type KumoComboboxInputSide = keyof typeof KUMO_COMBOBOX_VARIANTS.inputSide;

export interface KumoComboboxVariantsProps {
  inputSide?: KumoComboboxInputSide;
  size?: KumoComboboxSize;
}

export function comboboxVariants({
  inputSide = KUMO_COMBOBOX_DEFAULT_VARIANTS.inputSide,
}: KumoComboboxVariantsProps = {}) {
  return cn(
    resolveVariant(
      KUMO_COMBOBOX_VARIANTS.inputSide,
      inputSide,
      KUMO_COMBOBOX_DEFAULT_VARIANTS.inputSide,
    ).classes,
  );
}

export type ComboboxInputSide = KumoComboboxInputSide;
export type ComboboxSize = KumoComboboxSize;
