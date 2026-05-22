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

  export interface AutocompleteProps {
    allowDeselect?: boolean;
    children?: Snippet;
    defaultValue?: string;
    description?: Snippet | string;
    disabled?: boolean;
    error?: string | { message: Snippet | string; match: FieldErrorMatch };
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
    label,
    labelTooltip,
    name,
    onOpenChange,
    onValueChange,
    open = $bindable(false),
    required,
    size = KUMO_AUTOCOMPLETE_DEFAULT_VARIANTS.size,
    value = $bindable(defaultValue),
  }: AutocompleteProps = $props();

  let inputValue = $derived(value ?? "");
  let visibleItems = $state<Record<string, true>>({});
  let visibleItemCount = $derived(Object.keys(visibleItems).length);
  let fieldRequired = $derived(required === true ? true : required === false ? false : undefined);
  let normalizedError = $derived(normalizeFieldError(error));

  function setInputValue(nextValue: string) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function handleValueChange(nextValue: string) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function registerVisibleItem(id: string) {
    visibleItems = { ...visibleItems, [id]: true };

    return () => {
      let { [id]: _removed, ...nextVisibleItems } = visibleItems;
      visibleItems = nextVisibleItems;
    };
  }

  function shouldShowItem(value: string, label?: string) {
    let query = inputValue.trim().toLocaleLowerCase();
    if (!query) return true;

    let text = (label ?? value).toLocaleLowerCase();
    return text.includes(query);
  }

  setAutocompleteContext({
    get hasVisibleItems() {
      return inputValue.trim() === "" || visibleItemCount > 0;
    },
    get inputValue() {
      return inputValue;
    },
    get size() {
      return size;
    },
    registerVisibleItem,
    setInputValue,
    shouldShowItem,
  });
</script>

{#snippet control()}
  <ComboboxPrimitive.Root
    type="single"
    {allowDeselect}
    {disabled}
    inputValue={inputValue}
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
