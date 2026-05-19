import { getContext, setContext } from "svelte";
import type { KumoAutocompleteSize } from "./variants";

export interface AutocompleteContextValue {
  readonly size: KumoAutocompleteSize;
  setInputValue(value: string): void;
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
