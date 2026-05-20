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
    onValueChange,
    open = $bindable(),
    required,
    size = KUMO_COMBOBOX_DEFAULT_VARIANTS.size,
    value = $bindable(defaultValue ?? (multiple ? [] : "")),
  }: ComboboxProps = $props();

  let inputValue = $state(typeof value === "string" ? value : "");
  let clearEpoch = $state(0);
  let fieldRequired = $derived(required === true ? true : required === false ? false : undefined);
  let normalizedError = $derived(normalizeFieldError(error));
  let singleValue = $derived(typeof value === "string" ? value : "");
  let multipleValue = $derived(Array.isArray(value) ? value : []);

  function setInputValue(nextValue: string) {
    inputValue = nextValue;
  }

  function handleValueChange(nextValue: string | string[]) {
    value = nextValue;
    if (typeof nextValue === "string") {
      inputValue = nextValue;
    }
    onValueChange?.(nextValue);
  }

  function clearValue() {
    let nextValue = multiple ? [] : "";

    inputValue = "";
    value = nextValue;
    clearEpoch += 1;
    onValueChange?.(nextValue);
  }

  function shouldShowItem(value: string, label?: string) {
    if (!items.length) return true;

    let query = inputValue.trim().toLocaleLowerCase();
    if (!query) return true;

    let text = (label ?? items.find((item) => item.value === value)?.label ?? value).toLocaleLowerCase();
    return text.includes(query);
  }

  setComboboxContext({
    get canClear() {
      return multiple ? inputValue.length > 0 || multipleValue.length > 0 : inputValue.length > 0 || singleValue.length > 0;
    },
    get clearEpoch() {
      return clearEpoch;
    },
    get inputValue() {
      return inputValue;
    },
    get size() {
      return size;
    },
    clearValue,
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
      bind:open
      {required}
      value={multipleValue}
      onOpenChange={onOpenChange}
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
      bind:open
      {required}
      value={singleValue}
      onOpenChange={onOpenChange}
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
