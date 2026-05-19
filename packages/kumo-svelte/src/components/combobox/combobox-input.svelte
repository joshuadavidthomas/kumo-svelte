<script lang="ts">
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { inputVariants } from "../input";
  import { getComboboxContext } from "./context";
  import type { KumoComboboxSize } from "./variants";

  export interface ComboboxInputProps {
    "aria-label"?: string;
    autocomplete?: HTMLInputAttributes["autocomplete"];
    class?: string;
    clearOnDeselect?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    size?: KumoComboboxSize;
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
    oninput,
    onValueChange,
    placeholder,
    required,
    size: sizeProp,
  }: ComboboxInputProps = $props();

  const context = getComboboxContext("Input");
  let size = $derived(sizeProp ?? context.size);

  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    context.setInputValue(event.currentTarget.value);
    oninput?.(event);
    onValueChange?.(event.currentTarget.value);
  }
</script>

<ComboboxPrimitive.Input
  data-slot="combobox-input"
  class={cn(inputVariants({ size }), "w-full", className)}
  aria-label={ariaLabel}
  {autocomplete}
  {clearOnDeselect}
  {defaultValue}
  {disabled}
  {id}
  {name}
  oninput={handleInput}
  {placeholder}
  {required}
/>
