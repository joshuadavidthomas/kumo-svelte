import type { ComponentProps } from "svelte";
import SensitiveInputComponent from "./sensitive-input.svelte";

export { default as SensitiveInput } from "./sensitive-input.svelte";
export type SensitiveInputProps = ComponentProps<typeof SensitiveInputComponent>;
export {
  KUMO_SENSITIVE_INPUT_DEFAULT_VARIANTS,
  KUMO_SENSITIVE_INPUT_VARIANTS,
  sensitiveInputVariants,
  type KumoSensitiveInputSize,
  type KumoSensitiveInputVariant,
  type KumoSensitiveInputVariantsProps,
} from "./variants";
