import { getContext, setContext } from "svelte";
import type { KumoComboboxSize } from "./variants";

export interface ComboboxContextValue {
  readonly size: KumoComboboxSize;
  setInputValue(value: string): void;
}

const comboboxContextKey = Symbol("kumo-combobox");

export function setComboboxContext(context: ComboboxContextValue) {
  setContext(comboboxContextKey, context);
}

export function getComboboxContext(componentName: string) {
  const context = getContext<ComboboxContextValue | undefined>(comboboxContextKey);

  if (!context) {
    throw new Error(`Combobox.${componentName} must be used within a Combobox component.`);
  }

  return context;
}
