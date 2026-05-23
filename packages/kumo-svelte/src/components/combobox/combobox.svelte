<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import Field from "../field/field.svelte";
  import { normalizeFieldError, type FieldErrorMatch } from "../field";
  import { setComboboxContext } from "./context";
  import { KUMO_COMBOBOX_DEFAULT_VARIANTS, type KumoComboboxSize } from "./variants";

  /** Root component for the searchable select. */
  export interface ComboboxProps {
    /** Allow selecting the current single value again to clear it. */
    allowDeselect?: boolean;
    /** Trigger and dropdown content. */
    children?: Snippet;
    /** Initial selected value. Use a string array when `multiple` is true. */
    defaultValue?: string | string[];
    /** Helper text displayed below the combobox. */
    description?: Snippet | string;
    /** Disable the combobox and descendant controls. */
    disabled?: boolean;
    /** Error message or validation error object. */
    error?: string | { message: Snippet | string; match: FieldErrorMatch };
    /** Label content for the combobox. Enables the built-in Field wrapper. */
    label?: Snippet | string;
    /** Tooltip content displayed next to the label. */
    labelTooltip?: Snippet;
    /** Allow multiple selections. Use a string array value. */
    multiple?: boolean;
    /** Form field name. */
    name?: string;
    /** Called when the dropdown opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /** Called after the open or close transition completes. */
    onOpenChangeComplete?: (open: boolean) => void;
    /** Called when selection changes. */
    onValueChange?: (value: string | string[]) => void;
    /** Dropdown open state. Bind with `bind:open` for two-way state. */
    open?: boolean;
    /** Mark the field as required. */
    required?: boolean;
    /**
     * Size of the combobox trigger. Matches Input component sizes.
     * @displayType "xs" | "sm" | "base" | "lg"
     * @default "base"
     */
    size?: KumoComboboxSize;
    /**
     * Selected value. Bind with `bind:value` for two-way state.
     * @default "" or []
     */
    value?: string | string[];
  }

  let {
    allowDeselect = false,
    children,
    defaultValue,
    description,
    disabled = false,
    error,
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
  let triggerNode = $state<HTMLElement | null>(null);
  let visibleItems = $state<Record<string, true>>({});
  let visibleItemCount = $derived(Object.keys(visibleItems).length);
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

  function setTriggerNode(node: HTMLElement | null) {
    triggerNode = node;
  }

  function registerVisibleItem(id: string) {
    visibleItems = { ...visibleItems, [id]: true };

    return () => {
      let { [id]: _removed, ...nextVisibleItems } = visibleItems;
      visibleItems = nextVisibleItems;
    };
  }

  function shouldShowItem(value: string, label?: string) {
    let query = filterValue.trim().toLocaleLowerCase();
    if (!query) return true;

    let text = (label ?? value).toLocaleLowerCase();
    return text.includes(query);
  }

  setComboboxContext({
    get canClear() {
      return multiple ? multipleValue.length > 0 : singleValue.length > 0;
    },
    get hasVisibleItems() {
      return filterValue.trim() === "" || visibleItemCount > 0;
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
    get triggerNode() {
      return triggerNode;
    },
    clearValue,
    registerVisibleItem,
    removeValue,
    resetInputValue,
    setInputValue,
    setTriggerNode,
    shouldShowItem,
  });
</script>

{#snippet control()}
  {#if multiple}
    <ComboboxPrimitive.Root
      type="multiple"
      {disabled}
      inputValue={inputValue}
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
