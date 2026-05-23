import { getContext, setContext } from "svelte";
import type { KumoComboboxSize } from "./variants";

export interface ComboboxContextValue {
  readonly canClear: boolean;
  readonly hasVisibleItems: boolean;
  readonly inputValue: string;
  readonly selectedValues: string[];
  readonly size: KumoComboboxSize;
  readonly triggerNode: HTMLElement | null;
  clearValue(): void;
  registerVisibleItem(id: string): () => void;
  removeValue(value: string): void;
  resetInputValue(): void;
  setInputValue(value: string): void;
  setTriggerNode(node: HTMLElement | null): void;
  shouldShowItem(value: string, label?: string): boolean;
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
