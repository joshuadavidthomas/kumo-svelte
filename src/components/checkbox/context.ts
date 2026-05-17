import { getContext, setContext } from "svelte";

const CHECKBOX_GROUP_CONTEXT = Symbol("kumo-checkbox-group");

export interface CheckboxGroupContextValue {
  readonly controlFirst: boolean;
}

export function setCheckboxGroupContext(value: CheckboxGroupContextValue) {
  setContext(CHECKBOX_GROUP_CONTEXT, value);
}

export function getCheckboxGroupContext() {
  return getContext<CheckboxGroupContextValue | undefined>(CHECKBOX_GROUP_CONTEXT);
}
