<script lang="ts">
  import type { Snippet } from "svelte";
  import type { PortalProps } from "bits-ui";
  import { safeRandomId } from "../../utils/cn";
  import Field from "../field/field.svelte";
  import { normalizeFieldError, type FieldErrorMatch } from "../field";
  import SkeletonLine from "../loader/skeleton-line.svelte";
  import SelectContent from "./select-content.svelte";
  import SelectOption from "./select-option.svelte";
  import SelectPortal from "./select-portal.svelte";
  import SelectRoot from "./select-root.svelte";
  import SelectTrigger from "./select-trigger.svelte";
  import SelectValue from "./select-value.svelte";
  import SelectViewport from "./select-viewport.svelte";
  import {
    KUMO_SELECT_DEFAULT_VARIANTS,
    type KumoSelectSize,
  } from "./variants";

  export interface SelectItemDescriptor {
    disabled?: boolean;
    label: string;
  }

  export type SelectItemValue = string | SelectItemDescriptor;

  export interface NormalizedSelectItem {
    disabled?: boolean;
    label: string;
    value: string;
  }

  export type SelectItems = Record<string, SelectItemValue> | ReadonlyArray<NormalizedSelectItem>;

  export interface SelectProps {
    "aria-label"?: string;
    "aria-labelledby"?: string;
    allowDeselect?: boolean;
    children?: Snippet;
    class?: string;
    container?: PortalProps["to"];
    defaultValue?: string | string[];
    description?: Snippet | string;
    disabled?: boolean;
    error?: string | { message: Snippet | string; match: FieldErrorMatch };
    hideLabel?: boolean;
    items?: SelectItems;
    label?: Snippet | string;
    labelTooltip?: Snippet;
    loading?: boolean;
    multiple?: boolean;
    name?: string;
    onValueChange?: (value: string | string[]) => void;
    placeholder?: string;
    required?: boolean;
    size?: KumoSelectSize;
    value?: string | string[];
  }

  let {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    allowDeselect = false,
    children,
    class: className,
    container,
    defaultValue,
    description,
    disabled = false,
    error,
    hideLabel = false,
    items,
    label,
    labelTooltip,
    loading = false,
    multiple = false,
    name,
    onValueChange,
    placeholder,
    required,
    size = KUMO_SELECT_DEFAULT_VARIANTS.size,
    value,
  }: SelectProps = $props();

  let generatedId = safeRandomId();
  let labelId = $derived(label ? `${generatedId}-label` : undefined);
  let internalValue = $state<string | string[] | undefined>();
  let normalizedError = $derived(normalizeFieldError(error));
  let effectiveValue = $derived(value ?? internalValue ?? defaultValue ?? (multiple ? [] : ""));
  let selectedSingleValue = $derived(typeof effectiveValue === "string" ? effectiveValue : "");
  let selectedMultipleValue = $derived(Array.isArray(effectiveValue) ? effectiveValue : []);
  let normalizedItems = $derived(normalizeSelectItems(items));
  let showField = $derived(!!label && !hideLabel);
  let fallbackAriaLabel = $derived(typeof label === "string" ? label : placeholder);
  let triggerAriaLabel = $derived(ariaLabel ?? (!ariaLabelledby && !labelId ? fallbackAriaLabel : undefined));
  let triggerAriaLabelledby = $derived(ariaLabelledby ?? (!showField ? labelId : undefined));
  let triggerDisabled = $derived(disabled || loading);

  function normalizeSelectItems(items: SelectItems | undefined): NormalizedSelectItem[] {
    if (!items) return [];
    if (Array.isArray(items)) return [...items];

    return Object.entries(items)
      .filter(([, item]) => item !== null)
      .map(([value, item]) =>
        typeof item === "string" ? { label: item, value } : { ...item, value },
      );
  }

  function handleValueChange(nextValue: string | string[]) {
    internalValue = nextValue;
    onValueChange?.(nextValue);
  }

</script>

{#snippet selectControl()}
  {#if multiple}
    <SelectRoot
      type="multiple"
      value={selectedMultipleValue}
      onValueChange={handleValueChange}
      items={normalizedItems}
      {name}
      disabled={triggerDisabled}
      {required}
    >
      {@render triggerAndContent()}
    </SelectRoot>
  {:else}
    <SelectRoot
      type="single"
      value={selectedSingleValue}
      onValueChange={handleValueChange}
      items={normalizedItems}
      {name}
      disabled={triggerDisabled}
      {required}
      {allowDeselect}
    >
      {@render triggerAndContent()}
    </SelectRoot>
  {/if}
{/snippet}

{#snippet triggerAndContent()}
  <SelectTrigger
    aria-label={triggerAriaLabel}
    aria-labelledby={triggerAriaLabelledby}
    class={className}
    disabled={triggerDisabled}
    {loading}
    {size}
  >
    {#if loading}
      <SkeletonLine class="w-32" />
    {:else}
      <SelectValue {placeholder} />
    {/if}
  </SelectTrigger>
  <SelectPortal to={container}>
    <SelectContent>
      <SelectViewport>
        {#if children}
          {@render children()}
        {:else}
          {#each normalizedItems as item (item.value)}
            <SelectOption value={item.value} label={item.label} disabled={item.disabled} />
          {/each}
        {/if}
      </SelectViewport>
    </SelectContent>
  </SelectPortal>
{/snippet}

{#if showField}
  <Field
    label={label ?? ""}
    {required}
    {labelTooltip}
    description={description}
    error={normalizedError}
    hideLabel
  >
    {@render selectControl()}
  </Field>
{:else}
  <div class="grid gap-2">
    {#if label && labelId}
      <span id={labelId} class="sr-only">
        {#if typeof label === "string"}
          {label}
        {:else}
          {@render label()}
        {/if}
      </span>
    {/if}
    {@render selectControl()}
    {#if normalizedError}
      <span class="text-sm text-kumo-danger">
        {#if typeof normalizedError.message === "string"}
          {normalizedError.message}
        {:else}
          {@render normalizedError.message()}
        {/if}
      </span>
    {:else if description}
      <span class="text-sm leading-snug text-kumo-subtle">
        {#if typeof description === "string"}
          {description}
        {:else}
          {@render description()}
        {/if}
      </span>
    {/if}
  </div>
{/if}
