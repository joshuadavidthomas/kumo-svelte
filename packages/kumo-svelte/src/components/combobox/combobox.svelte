<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import Field from "../field/field.svelte";
  import { normalizeFieldError, type FieldErrorMatch } from "../field";
  import { setComboboxContext } from "./context";
  import { KUMO_COMBOBOX_DEFAULT_VARIANTS, type KumoComboboxSize } from "./variants";

  export interface ComboboxItemDescriptor {
    disabled?: boolean;
    label: string;
    value: string;
  }

  export interface ComboboxProps {
    allowDeselect?: boolean;
    children?: Snippet;
    defaultValue?: string | string[];
    description?: Snippet | string;
    disabled?: boolean;
    error?: string | { message: Snippet | string; match: FieldErrorMatch };
    items?: ComboboxItemDescriptor[];
    label?: Snippet | string;
    labelTooltip?: Snippet;
    multiple?: boolean;
    name?: string;
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
    onValueChange?: (value: string | string[]) => void;
    open?: boolean;
    required?: boolean;
    size?: KumoComboboxSize;
    value?: string | string[];
  }

  let {
    allowDeselect = false,
    children,
    defaultValue,
    description,
    disabled = false,
    error,
    items = [],
    label,
    labelTooltip,
    multiple = false,
    name,
    onOpenChange,
    onOpenChangeComplete,
    onValueChange,
    open = $bindable(),
    required,
    size = KUMO_COMBOBOX_DEFAULT_VARIANTS.size,
    value = $bindable(defaultValue ?? (multiple ? [] : "")),
  }: ComboboxProps = $props();

  let searchValue = $state<string | undefined>();
  let filterValue = $state("");
  let fieldRequired = $derived(required === true ? true : required === false ? false : undefined);
  let normalizedError = $derived(normalizeFieldError(error));
  let singleValue = $derived(typeof value === "string" ? value : "");
  let multipleValue = $derived(Array.isArray(value) ? value : []);
  let inputValue = $derived(searchValue ?? (multiple ? "" : singleValue));

  function setInputValue(nextValue: string) {
    searchValue = nextValue;
    filterValue = nextValue;
  }

  function resetInputValue() {
    searchValue = undefined;
  }

  function handleOpenChange(nextOpen: boolean) {
    open = nextOpen;
    onOpenChange?.(nextOpen);
  }

  function handleOpenChangeComplete(nextOpen: boolean) {
    if (!nextOpen) {
      resetInputValue();
      filterValue = "";
    }
    onOpenChangeComplete?.(nextOpen);
  }

  function handleValueChange(nextValue: string | string[]) {
    value = nextValue;
    searchValue = typeof nextValue === "string" ? undefined : "";
    filterValue = "";

    if (open !== false) {
      open = false;
      onOpenChange?.(false);
    }

    onValueChange?.(nextValue);
  }

  function clearValue() {
    let nextValue = multiple ? [] : "";

    searchValue = "";
    filterValue = "";
    value = nextValue;
    open = false;
    onOpenChange?.(false);
    onValueChange?.(nextValue);
  }

  function removeValue(valueToRemove: string) {
    if (!multiple) return;

    let nextValue = multipleValue.filter((selectedValue) => selectedValue !== valueToRemove);
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function shouldShowItem(value: string, label?: string) {
    if (!items.length) return true;

    let query = filterValue.trim().toLocaleLowerCase();
    if (!query) return true;

    let text = (label ?? items.find((item) => item.value === value)?.label ?? value).toLocaleLowerCase();
    return text.includes(query);
  }

  setComboboxContext({
    get canClear() {
      return multiple ? multipleValue.length > 0 : singleValue.length > 0;
    },
    get inputValue() {
      return inputValue;
    },
    get selectedValues() {
      return multipleValue;
    },
    get size() {
      return size;
    },
    clearValue,
    removeValue,
    resetInputValue,
    setInputValue,
    shouldShowItem,
  });
</script>

{#snippet control()}
  {#if multiple}
    <ComboboxPrimitive.Root
      type="multiple"
      {disabled}
      inputValue={inputValue}
      {items}
      {name}
      open={open ?? false}
      {required}
      value={multipleValue}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
      onValueChange={handleValueChange}
    >
      {@render children?.()}
    </ComboboxPrimitive.Root>
  {:else}
    <ComboboxPrimitive.Root
      type="single"
      {allowDeselect}
      {disabled}
      inputValue={inputValue}
      {items}
      {name}
      open={open ?? false}
      {required}
      value={singleValue}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
      onValueChange={handleValueChange}
    >
      {@render children?.()}
    </ComboboxPrimitive.Root>
  {/if}
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
