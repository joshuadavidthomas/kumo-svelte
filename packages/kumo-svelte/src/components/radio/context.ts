import { getContext, setContext } from "svelte";
import {
  KUMO_RADIO_DEFAULT_VARIANTS,
  type KumoRadioAppearance,
  type RadioControlPosition,
} from "./variants";

const RADIO_GROUP_CONTEXT = Symbol("kumo-radio-group");

export interface RadioGroupContextValue {
  readonly appearance: KumoRadioAppearance;
  readonly controlPosition: RadioControlPosition | undefined;
  readonly legendId: string | undefined;
}

export function setRadioGroupContext(value: RadioGroupContextValue) {
  setContext(RADIO_GROUP_CONTEXT, value);
}

export function getRadioGroupContext() {
  return (
    getContext<RadioGroupContextValue | undefined>(RADIO_GROUP_CONTEXT) ?? {
      appearance: KUMO_RADIO_DEFAULT_VARIANTS.appearance,
      controlPosition: undefined,
      legendId: undefined,
    }
  );
}
