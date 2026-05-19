import { getContext, setContext } from "svelte";

const SWITCH_GROUP_CONTEXT = Symbol("kumo-switch-group");

export interface SwitchGroupContextValue {
  readonly controlFirst: boolean;
}

export function setSwitchGroupContext(value: SwitchGroupContextValue) {
  setContext(SWITCH_GROUP_CONTEXT, value);
}

export function getSwitchGroupContext() {
  return getContext<SwitchGroupContextValue | undefined>(SWITCH_GROUP_CONTEXT);
}
