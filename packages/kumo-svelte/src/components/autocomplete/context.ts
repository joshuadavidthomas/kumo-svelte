import { getContext, setContext } from "svelte";
import type { KumoAutocompleteSize } from "./variants";

export interface AutocompleteContextValue {
  readonly hasVisibleItems: boolean;
  readonly inputValue: string;
  readonly size: KumoAutocompleteSize;
  registerVisibleItem(id: string): () => void;
  setInputValue(value: string): void;
  shouldShowItem(value: string, label?: string): boolean;
}

const autocompleteContextKey = Symbol("kumo-autocomplete");

export function setAutocompleteContext(context: AutocompleteContextValue) {
  setContext(autocompleteContextKey, context);
}

export function getAutocompleteContext(componentName: string) {
  const context = getContext<AutocompleteContextValue | undefined>(autocompleteContextKey);

  if (!context) {
    throw new Error(`Autocomplete.${componentName} must be used within an Autocomplete component.`);
  }

  return context;
}
