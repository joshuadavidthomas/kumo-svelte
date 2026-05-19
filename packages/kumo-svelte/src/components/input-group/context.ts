import { getContext, setContext } from "svelte";
import type { KumoInputSize } from "../input/variants";
import type { FieldProps } from "../field";

export interface InputGroupSizeTokens {
  inputOuter: string;
  addonOuterStart: string;
  addonOuterEnd: string;
  addonButtonOuterStart: string;
  addonButtonOuterEnd: string;
  suffixPad: string;
  fontSize: string;
  iconSizeClass: string;
}

export const INPUT_GROUP_SIZE: Record<KumoInputSize, InputGroupSizeTokens> = {
  xs: {
    inputOuter: "px-1.5",
    addonOuterStart: "pl-1.5",
    addonOuterEnd: "pr-1.5",
    addonButtonOuterStart: "pl-1",
    addonButtonOuterEnd: "pr-1",
    suffixPad: "pr-1.5",
    fontSize: "text-xs",
    iconSizeClass: "[&_svg]:size-[10px]",
  },
  sm: {
    inputOuter: "px-2",
    addonOuterStart: "pl-1.5",
    addonOuterEnd: "pr-1.5",
    addonButtonOuterStart: "pl-1",
    addonButtonOuterEnd: "pr-1",
    suffixPad: "pr-2",
    fontSize: "text-xs",
    iconSizeClass: "[&_svg]:size-[13px]",
  },
  base: {
    inputOuter: "px-3",
    addonOuterStart: "pl-2",
    addonOuterEnd: "pr-2",
    addonButtonOuterStart: "pl-1",
    addonButtonOuterEnd: "pr-1",
    suffixPad: "pr-3",
    fontSize: "text-base",
    iconSizeClass: "[&_svg]:size-[18px]",
  },
  lg: {
    inputOuter: "px-4",
    addonOuterStart: "pl-2.5",
    addonOuterEnd: "pr-2.5",
    addonButtonOuterStart: "pl-1.5",
    addonButtonOuterEnd: "pr-1.5",
    suffixPad: "pr-4",
    fontSize: "text-base",
    iconSizeClass: "[&_svg]:size-[20px]",
  },
};

export const INPUT_GROUP_HAS_CLASSES: Record<KumoInputSize, string> = {
  xs: [
    "has-[[data-slot=input-group-addon-start]]:[&_input]:pl-1",
    "has-[[data-slot=input-group-addon-end]]:[&_input]:pr-1",
  ].join(" "),
  sm: [
    "has-[[data-slot=input-group-addon-start]]:[&_input]:pl-1.5",
    "has-[[data-slot=input-group-addon-end]]:[&_input]:pr-1.5",
  ].join(" "),
  base: [
    "has-[[data-slot=input-group-addon-start]]:[&_input]:pl-2",
    "has-[[data-slot=input-group-addon-end]]:[&_input]:pr-2",
  ].join(" "),
  lg: [
    "has-[[data-slot=input-group-addon-start]]:[&_input]:pl-2.5",
    "has-[[data-slot=input-group-addon-end]]:[&_input]:pr-2.5",
  ].join(" "),
};

export type InputGroupFocusMode = "container" | "individual";

export interface InputGroupContextValue {
  readonly disabled: boolean;
  readonly error: FieldProps["error"] | undefined;
  readonly focusMode: InputGroupFocusMode;
  readonly inputId: string;
  readonly size: KumoInputSize;
}

const inputGroupContextKey = Symbol("kumo-input-group");

export function setInputGroupContext(context: InputGroupContextValue) {
  setContext(inputGroupContextKey, context);
}

export function getInputGroupContext(componentName: string) {
  const context = getContext<InputGroupContextValue | undefined>(inputGroupContextKey);

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production" && !context) {
    console.warn(
      `<InputGroup.${componentName}> must be used within <InputGroup>. Falling back to default values.`,
    );
  }

  return context;
}
