<script lang="ts">
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { inputVariants } from "../input";
  import { getAutocompleteContext } from "./context";
  import type { KumoAutocompleteSize } from "./variants";

  export interface AutocompleteInputProps {
    "aria-label"?: string;
    autocomplete?: HTMLInputAttributes["autocomplete"];
    class?: string;
    clearOnDeselect?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
    onfocus?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
    oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
    onkeydown?: (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => void;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    size?: KumoAutocompleteSize;
  }

  let {
    "aria-label": ariaLabel,
    autocomplete,
    class: className,
    clearOnDeselect,
    defaultValue,
    disabled,
    id,
    name,
    onblur,
    onfocus,
    oninput,
    onkeydown,
    onValueChange,
    placeholder,
    required,
    size: sizeProp,
  }: AutocompleteInputProps = $props();

  const context = getAutocompleteContext("Input");
  let size = $derived(sizeProp ?? context.size);

  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    context.setInputValue(event.currentTarget.value);
    oninput?.(event);
    onValueChange?.(event.currentTarget.value);
  }
</script>

<ComboboxPrimitive.Input
  class={cn(inputVariants({ size, focusIndicator: true }), "w-full", className)}
  aria-label={ariaLabel}
  {autocomplete}
  {clearOnDeselect}
  {defaultValue}
  {disabled}
  {id}
  {name}
  oninput={handleInput}
  {onblur}
  {onfocus}
  {onkeydown}
  {placeholder}
  {required}
/>
