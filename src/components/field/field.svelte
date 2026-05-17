<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";
  import Label from "../label/label.svelte";
  import { fieldVariants, type KumoFieldVariantsProps } from "./variants";

  export type FieldErrorMatch =
    | boolean
    | "badInput"
    | "customError"
    | "patternMismatch"
    | "rangeOverflow"
    | "rangeUnderflow"
    | "stepMismatch"
    | "tooLong"
    | "tooShort"
    | "typeMismatch"
    | "valid"
    | "valueMissing";

  export interface NormalizedFieldError {
    message: Snippet | string;
    match: FieldErrorMatch;
  }

  export interface FieldProps extends KumoFieldVariantsProps {
    children: Snippet;
    class?: string;
    description?: Snippet | string;
    error?: NormalizedFieldError;
    for?: string;
    hideLabel?: boolean;
    label: Snippet | string;
    labelTooltip?: Snippet;
    required?: boolean;
  }

  let {
    children,
    class: className,
    controlFirst = false,
    description,
    error,
    for: htmlFor,
    hideLabel = false,
    label,
    labelTooltip,
    required,
  }: FieldProps = $props();

  let showOptional = $derived(required === false);
</script>

<div class={cn(fieldVariants({ controlFirst }), className)}>
  {#if !hideLabel}
    <Label
      for={htmlFor}
      showOptional={showOptional}
      tooltip={labelTooltip}
      class="m-0 select-none text-base font-medium text-kumo-default"
    >
      {#if typeof label === "string"}
        {label}
      {:else}
        {@render label()}
      {/if}
    </Label>
  {/if}
  {@render children()}
  {#if error}
    <p class="col-span-full text-sm leading-snug text-kumo-danger">
      {#if typeof error.message === "string"}
        {error.message}
      {:else}
        {@render error.message()}
      {/if}
    </p>
  {:else if description}
    <p class="col-span-full text-sm leading-snug text-kumo-subtle">
      {#if typeof description === "string"}
        {description}
      {:else}
        {@render description()}
      {/if}
    </p>
  {/if}
</div>
