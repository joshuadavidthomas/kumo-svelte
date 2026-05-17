<script lang="ts">
  import type { Snippet } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon.svelte";
  import MinusIcon from "phosphor-svelte/lib/MinusIcon.svelte";
  import { Checkbox as CheckboxPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getCheckboxGroupContext } from "./context";
  import {
    KUMO_CHECKBOX_DEFAULT_VARIANTS,
    type CheckboxVariant,
  } from "./variants";

  export interface CheckboxItemProps {
    variant?: CheckboxVariant;
    label: Snippet | string;
    value?: string;
    class?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    name?: string;
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
    value,
    onCheckedChange,
    name,
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  }: CheckboxItemProps = $props();

  const group = getCheckboxGroupContext();
  let controlFirst = $derived(group?.controlFirst ?? true);
</script>

<label
  class={cn(
    "m-0 relative inline-flex items-center gap-2",
    !controlFirst && "flex-row-reverse justify-end",
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
    className,
  )}
>
  <CheckboxPrimitive.Root
    bind:checked
    bind:indeterminate
    {disabled}
    {name}
    {value}
    {id}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    onCheckedChange={onCheckedChange}
    class={cn(
      "peer relative flex h-4 w-4 items-center justify-center rounded-sm border-0 bg-kumo-base ring after:absolute after:-inset-x-3 after:-inset-y-2",
      variant === "error" ? "ring-kumo-danger" : "ring-kumo-hairline",
      !disabled &&
        "group-hover:ring-kumo-hairline hover:ring-kumo-hairline focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand",
      "data-[state=checked]:bg-kumo-contrast data-[state=checked]:ring-kumo-contrast data-[state=indeterminate]:bg-kumo-contrast data-[state=indeterminate]:ring-kumo-contrast",
    )}
  >
    {#snippet children({ checked, indeterminate })}
      <span
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
  <span class="text-base text-kumo-default">
    {#if typeof label === "string"}
      {label}
    {:else}
      {@render label()}
    {/if}
  </span>
</label>
