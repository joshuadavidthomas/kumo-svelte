import type { ComponentProps } from "svelte";
import FieldComponent from "./field.svelte";

export { default as Field } from "./field.svelte";
export type FieldProps = ComponentProps<typeof FieldComponent>;
export type FieldErrorMatch = FieldProps["error"] extends { match: infer Match } ? Match : never;
export type NormalizedFieldError = NonNullable<FieldProps["error"]>;

export function normalizeFieldError(
  error:
    | string
    | {
        message: NormalizedFieldError["message"];
        match: FieldErrorMatch;
      }
    | undefined,
): NormalizedFieldError | undefined {
  if (!error) return undefined;
  if (typeof error === "string") return { message: error, match: true };
  return error;
}

export {
  fieldVariants,
  KUMO_FIELD_DEFAULT_VARIANTS,
  KUMO_FIELD_VARIANTS,
  type KumoFieldVariantsProps,
} from "./variants";
