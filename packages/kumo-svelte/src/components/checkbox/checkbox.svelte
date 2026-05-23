<script lang="ts">
  import type { Snippet } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon";
  import MinusIcon from "phosphor-svelte/lib/MinusIcon";
  import { Checkbox as CheckboxPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import Label from "../label/label.svelte";
  import {
    KUMO_CHECKBOX_DEFAULT_VARIANTS,
    type CheckboxVariant,
  } from "./variants";

  export type CheckboxChangeEventDetails = boolean;

  export interface CheckboxProps {
    variant?: CheckboxVariant;
    label?: Snippet | string;
    labelTooltip?: Snippet;
    controlFirst?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    name?: string;
    value?: string;
    required?: boolean;
    class?: string;
    id?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
  }

  let {
    class: className,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    disabled = false,
    variant = KUMO_CHECKBOX_DEFAULT_VARIANTS.variant,
    label,
    labelTooltip,
    controlFirst = true,
    onCheckedChange,
    required,
    name,
    value,
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  }: CheckboxProps = $props();

  const controlClasses =
    "relative flex h-4 w-4 items-center justify-center rounded-sm border-0 bg-kumo-base ring focus:outline-none after:absolute after:-inset-x-3 after:-inset-y-2";
</script>

{#snippet control()}
  <CheckboxPrimitive.Root
    data-slot="checkbox"
    bind:checked
    bind:indeterminate
    {disabled}
    {name}
    {value}
    {required}
    {id}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    onCheckedChange={onCheckedChange}
    class={cn(
      controlClasses,
      variant === "error" ? "ring-kumo-danger" : "ring-kumo-hairline",
      !disabled &&
        "hover:ring-kumo-hairline focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand",
      "data-[state=checked]:bg-kumo-contrast data-[state=checked]:ring-kumo-contrast data-[state=indeterminate]:bg-kumo-contrast data-[state=indeterminate]:ring-kumo-contrast",
      disabled && "cursor-not-allowed opacity-50",
      className,
    )}
  >
    {#snippet children({ checked, indeterminate })}
      <span
        data-slot="checkbox-indicator"
        class={cn(
          "flex size-3 items-center justify-center text-kumo-inverse",
          !checked && !indeterminate && "invisible",
        )}
      >
        {#if indeterminate}
          <MinusIcon aria-hidden="true" size={12} weight="bold" />
        {:else}
          <CheckIcon aria-hidden="true" size={12} weight="bold" />
        {/if}
      </span>
    {/snippet}
  </CheckboxPrimitive.Root>
{/snippet}

{#if label}
  <label
    class={cn(
      "inline-flex items-center gap-2",
      controlFirst ? "flex-row" : "flex-row-reverse justify-end",
      disabled ? "cursor-not-allowed" : "cursor-pointer",
    )}
  >
    {@render control()}
    <Label showOptional={required === false} tooltip={labelTooltip} asContent>
      {#if typeof label === "string"}
        {label}
      {:else}
        {@render label()}
      {/if}
    </Label>
  </label>
{:else}
  {@render control()}
{/if}
