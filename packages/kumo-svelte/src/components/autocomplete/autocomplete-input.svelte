<script lang="ts">
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { inputVariants } from "../input";
  import { getAutocompleteContext } from "./context";
  import type { KumoAutocompleteSize } from "./variants";

  type PrimitiveFocusHandler = (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
  type PrimitiveInputHandler = (event: Event & { currentTarget: HTMLInputElement }) => void;
  type PrimitiveKeyboardHandler = (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => void;

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

  function getPrimitiveOnBlur(props: Record<string, unknown>) {
    return props.onblur as PrimitiveFocusHandler | undefined;
  }

  function getPrimitiveOnFocus(props: Record<string, unknown>) {
    return props.onfocus as PrimitiveFocusHandler | undefined;
  }

  function getPrimitiveOnInput(props: Record<string, unknown>) {
    return props.oninput as PrimitiveInputHandler | undefined;
  }

  function getPrimitiveOnKeydown(props: Record<string, unknown>) {
    return props.onkeydown as PrimitiveKeyboardHandler | undefined;
  }

  function handleBlur(
    event: FocusEvent & { currentTarget: HTMLInputElement },
    primitiveOnBlur?: PrimitiveFocusHandler,
  ) {
    primitiveOnBlur?.(event);
    onblur?.(event);
  }

  function handleFocus(
    event: FocusEvent & { currentTarget: HTMLInputElement },
    primitiveOnFocus?: PrimitiveFocusHandler,
  ) {
    primitiveOnFocus?.(event);
    onfocus?.(event);
  }

  function handleInput(
    event: Event & { currentTarget: HTMLInputElement },
    primitiveOnInput?: PrimitiveInputHandler,
  ) {
    const nextValue = event.currentTarget.value;

    primitiveOnInput?.(event);
    context.setInputValue(nextValue);
    oninput?.(event);
    onValueChange?.(nextValue);
  }

  function handleKeydown(
    event: KeyboardEvent & { currentTarget: HTMLInputElement },
    primitiveOnKeydown?: PrimitiveKeyboardHandler,
  ) {
    primitiveOnKeydown?.(event);
    onkeydown?.(event);
  }
</script>

<ComboboxPrimitive.Input
  data-slot="autocomplete-input"
  class={cn(inputVariants({ size, focusIndicator: true }), "w-full", className)}
  aria-label={ariaLabel}
  {autocomplete}
  {clearOnDeselect}
  {defaultValue}
  {disabled}
  {id}
  {name}
  {placeholder}
  {required}
>
  {#snippet child({ props })}
    <input
      {...props}
      data-slot="autocomplete-input"
      onblur={(event) => handleBlur(event, getPrimitiveOnBlur(props))}
      onfocus={(event) => handleFocus(event, getPrimitiveOnFocus(props))}
      oninput={(event) => handleInput(event, getPrimitiveOnInput(props))}
      onkeydown={(event) => handleKeydown(event, getPrimitiveOnKeydown(props))}
    />
  {/snippet}
</ComboboxPrimitive.Input>
