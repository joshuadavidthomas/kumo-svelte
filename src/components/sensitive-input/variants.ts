import {
  inputVariants,
  KUMO_INPUT_DEFAULT_VARIANTS,
  KUMO_INPUT_VARIANTS,
  type KumoInputSize,
  type KumoInputVariant,
  type KumoInputVariantsProps,
} from "../input";

export const KUMO_SENSITIVE_INPUT_VARIANTS = KUMO_INPUT_VARIANTS;

export const KUMO_SENSITIVE_INPUT_DEFAULT_VARIANTS = {
  size: KUMO_INPUT_DEFAULT_VARIANTS.size,
  variant: KUMO_INPUT_DEFAULT_VARIANTS.variant,
} as const;

export { inputVariants as sensitiveInputVariants };
export type {
  KumoInputSize as KumoSensitiveInputSize,
  KumoInputVariant as KumoSensitiveInputVariant,
  KumoInputVariantsProps as KumoSensitiveInputVariantsProps,
};
