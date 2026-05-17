<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn, safeRandomId } from "../../utils/cn";
  import Field from "../field/field.svelte";
  import { normalizeFieldError, type FieldErrorMatch } from "../field";
  import {
    KUMO_INPUT_DEFAULT_VARIANTS,
    inputVariants,
    type KumoInputSize,
    type KumoInputVariant,
  } from "./variants";

  type NativeInputProps = Omit<HTMLInputAttributes, "size" | "value">;

  export interface InputProps extends NativeInputProps {
    description?: Snippet | string;
    error?: string | { message: Snippet | string; match: FieldErrorMatch };
    label?: Snippet | string;
    labelTooltip?: Snippet;
    passwordManagerIgnore?: boolean;
    size?: KumoInputSize;
    value?: string | number | string[] | undefined;
    variant?: KumoInputVariant;
  }

  let {
    class: className,
    description,
    error,
    id,
    label,
    labelTooltip,
    passwordManagerIgnore = false,
    required,
    size = KUMO_INPUT_DEFAULT_VARIANTS.size,
    value = $bindable(),
    variant: variantProp,
    ...restProps
  }: InputProps = $props();

  let generatedId = safeRandomId();
  let inputId = $derived(id ?? (label || error || description ? generatedId : undefined));
  let fieldRequired = $derived(required === true ? true : required === false ? false : undefined);
  let variant = $derived(variantProp ?? (error ? "error" : "default"));
  let normalizedError = $derived(normalizeFieldError(error));
  let inputClass = $derived(
    cn(
      inputVariants({ size, variant, focusIndicator: true }),
      passwordManagerIgnore && "keeper-ignore",
      className,
    ),
  );
</script>

{#snippet control()}
  <input
    id={inputId}
    bind:value
    class={inputClass}
    {required}
    data-1p-ignore={passwordManagerIgnore ? "true" : undefined}
    data-bwignore={passwordManagerIgnore ? "true" : undefined}
    data-form-type={passwordManagerIgnore ? "other" : undefined}
    data-lpignore={passwordManagerIgnore ? "true" : undefined}
    {...restProps}
  />
{/snippet}

{#if label || error || description}
  <Field
    label={label ?? ""}
    for={inputId}
    required={fieldRequired}
    {labelTooltip}
    description={description}
    error={normalizedError}
  >
    {@render control()}
  </Field>
{:else}
  {@render control()}
{/if}
