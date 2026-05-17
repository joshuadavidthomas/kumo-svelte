import type { ComponentProps } from "svelte";
import InputAreaComponent from "./input-area.svelte";
import InputComponent from "./input.svelte";

export { default as Input } from "./input.svelte";
export { default as InputArea } from "./input-area.svelte";
export { default as Textarea } from "./input-area.svelte";

export type InputProps = ComponentProps<typeof InputComponent>;
export type InputAreaProps = ComponentProps<typeof InputAreaComponent>;
export type TextareaProps = InputAreaProps;

export {
  inputVariants,
  KUMO_INPUT_DEFAULT_VARIANTS,
  KUMO_INPUT_STYLING,
  KUMO_INPUT_VARIANTS,
  type InputSize,
  type InputVariant,
  type KumoInputSize,
  type KumoInputVariant,
  type KumoInputVariantsProps,
} from "./variants";
