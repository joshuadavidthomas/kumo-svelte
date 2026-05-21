<script lang="ts">
  import { flushSync } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { inputVariants } from "../input";
  import { getComboboxContext } from "./context";
  import type { KumoComboboxSize } from "./variants";

  type PrimitiveFocusHandler = (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
  type PrimitiveInputHandler = (event: Event & { currentTarget: HTMLInputElement }) => void;

  export interface ComboboxInputProps {
    "aria-label"?: string;
    autocomplete?: HTMLInputAttributes["autocomplete"];
    class?: string;
    clearOnDeselect?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
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
    clearOnDeselect = true,
    defaultValue,
    disabled,
    id,
    name,
    onblur,
    oninput,
    onValueChange,
    placeholder,
    required,
    size: sizeProp,
  }: ComboboxInputProps = $props();

  const context = getComboboxContext("Input");
  let size = $derived(sizeProp ?? context.size);

  function getPrimitiveOnBlur(props: Record<string, unknown>) {
    return props.onblur as PrimitiveFocusHandler | undefined;
  }

  function getPrimitiveOnInput(props: Record<string, unknown>) {
    return props.oninput as PrimitiveInputHandler | undefined;
  }

  function handleBlur(
    event: FocusEvent & { currentTarget: HTMLInputElement },
    primitiveOnBlur?: PrimitiveFocusHandler,
  ) {
    primitiveOnBlur?.(event);
    context.resetInputValue();
    flushSync();
    event.currentTarget.value = context.inputValue;
    onblur?.(event);
  }

  function handleInput(
    event: Event & { currentTarget: HTMLInputElement },
    primitiveOnInput?: PrimitiveInputHandler,
  ) {
    const nextValue = event.currentTarget.value;

    context.setInputValue(nextValue);
    flushSync();
    primitiveOnInput?.(event);
    oninput?.(event);
    onValueChange?.(nextValue);
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
  {placeholder}
  {required}
>
  {#snippet child({ props })}
    <input
      {...props}
      data-slot="combobox-input"
      onblur={(event) => handleBlur(event, getPrimitiveOnBlur(props))}
      oninput={(event) => handleInput(event, getPrimitiveOnInput(props))}
    />
  {/snippet}
</ComboboxPrimitive.Input>
