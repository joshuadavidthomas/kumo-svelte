<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import Field from "../field/field.svelte";
  import { normalizeFieldError, type FieldErrorMatch } from "../field";
  import { setAutocompleteContext } from "./context";
  import {
    KUMO_AUTOCOMPLETE_DEFAULT_VARIANTS,
    type KumoAutocompleteSize,
  } from "./variants";

  export interface AutocompleteItemDescriptor {
    disabled?: boolean;
    label: string;
    value: string;
  }

  export interface AutocompleteProps {
    allowDeselect?: boolean;
    children?: Snippet;
    defaultValue?: string;
    description?: Snippet | string;
    disabled?: boolean;
    error?: string | { message: Snippet | string; match: FieldErrorMatch };
    items?: AutocompleteItemDescriptor[];
    label?: Snippet | string;
    labelTooltip?: Snippet;
    name?: string;
    onOpenChange?: (open: boolean) => void;
    onValueChange?: (value: string) => void;
    open?: boolean;
    required?: boolean;
    size?: KumoAutocompleteSize;
    value?: string;
  }

  let {
    allowDeselect = true,
    children,
    defaultValue = "",
    description,
    disabled = false,
    error,
    items = [],
    label,
    labelTooltip,
    name,
    onOpenChange,
    onValueChange,
    open = $bindable(),
    required,
    size = KUMO_AUTOCOMPLETE_DEFAULT_VARIANTS.size,
    value = $bindable(defaultValue),
  }: AutocompleteProps = $props();

  let inputValue = $state(value);
  let fieldRequired = $derived(required === true ? true : required === false ? false : undefined);
  let normalizedError = $derived(normalizeFieldError(error));

  function setInputValue(nextValue: string) {
    inputValue = nextValue;
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function handleValueChange(nextValue: string) {
    value = nextValue;
    inputValue = nextValue;
    onValueChange?.(nextValue);
  }

  setAutocompleteContext({
    get size() {
      return size;
    },
    setInputValue,
  });
</script>

{#snippet control()}
  <ComboboxPrimitive.Root
    type="single"
    {allowDeselect}
    {disabled}
    inputValue={inputValue}
    {items}
    {name}
    bind:open
    {required}
    value={value}
    onOpenChange={onOpenChange}
    onValueChange={handleValueChange}
  >
    {@render children?.()}
  </ComboboxPrimitive.Root>
{/snippet}

{#if label || error || description}
  <Field
    label={label ?? ""}
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
