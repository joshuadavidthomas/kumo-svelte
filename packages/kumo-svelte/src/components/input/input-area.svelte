<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { cn, safeRandomId } from "../../utils/cn";
  import Field from "../field/field.svelte";
  import { normalizeFieldError, type FieldErrorMatch } from "../field";
  import {
    KUMO_INPUT_DEFAULT_VARIANTS,
    inputVariants,
    type KumoInputSize,
    type KumoInputVariant,
  } from "./variants";

  type NativeTextareaProps = Omit<HTMLTextareaAttributes, "value">;

  export interface InputAreaProps extends NativeTextareaProps {
    description?: Snippet | string;
    error?: string | { message: Snippet | string; match: FieldErrorMatch };
    label?: Snippet | string;
    labelTooltip?: Snippet;
    onValueChange?: (value: string) => void;
    size?: KumoInputSize;
    value?: string | undefined;
    variant?: KumoInputVariant;
  }

  let {
    class: className,
    description,
    error,
    id,
    label,
    labelTooltip,
    oninput,
    onValueChange,
    required,
    size = KUMO_INPUT_DEFAULT_VARIANTS.size,
    value = $bindable(),
    variant: variantProp,
    ...restProps
  }: InputAreaProps = $props();

  let generatedId = safeRandomId();
  let inputId = $derived(id ?? (label || error || description ? generatedId : undefined));
  let fieldRequired = $derived(required === true ? true : required === false ? false : undefined);
  let variant = $derived(variantProp ?? (error ? "error" : "default"));
  let normalizedError = $derived(normalizeFieldError(error));
  let textareaClass = $derived(
    cn(inputVariants({ size, variant, focusIndicator: true }), "h-auto py-2", className),
  );

  function handleInput(event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }) {
    oninput?.(event);
    onValueChange?.(event.currentTarget.value);
  }
</script>

{#snippet control()}
  <textarea
    id={inputId}
    bind:value
    class={textareaClass}
    {required}
    oninput={handleInput}
    {...restProps}
  ></textarea>
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
