<script lang="ts">
  import { flushSync } from "svelte";
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
  import XIcon from "phosphor-svelte/lib/XIcon";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { inputVariants } from "../input";
  import { getComboboxContext } from "./context";
  import type { KumoComboboxSize } from "./variants";

  const triggerInputIconStyles: Record<
    KumoComboboxSize,
    { padding: string; iconSize: number; clearRight: string; caretRight: string }
  > = {
    xs: { padding: "pr-7", iconSize: 12, clearRight: "right-5", caretRight: "right-1" },
    sm: { padding: "pr-9", iconSize: 14, clearRight: "right-6", caretRight: "right-1.5" },
    base: { padding: "pr-12", iconSize: 16, clearRight: "right-8", caretRight: "right-2" },
    lg: { padding: "pr-14", iconSize: 18, clearRight: "right-9", caretRight: "right-3" },
  };

  type PrimitiveFocusHandler = (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
  type PrimitiveInputHandler = (event: Event & { currentTarget: HTMLInputElement }) => void;

  export interface ComboboxTriggerInputProps {
    "aria-label"?: string;
    autocomplete?: HTMLInputAttributes["autocomplete"];
    class?: string;
    clearLabel?: string;
    clearOnDeselect?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
    oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    showOptionsLabel?: string;
  }

  let {
    "aria-label": ariaLabel,
    autocomplete,
    class: className,
    clearLabel = "Clear selection",
    clearOnDeselect = true,
    defaultValue,
    disabled,
    onblur,
    oninput,
    onValueChange,
    placeholder,
    showOptionsLabel = "Show options",
  }: ComboboxTriggerInputProps = $props();

  const context = getComboboxContext("TriggerInput");
  let inputElement = $state<HTMLInputElement>();
  let iconStyles = $derived(triggerInputIconStyles[context.size]);

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

  function handleClearPointerDown(event: PointerEvent) {
    event.preventDefault();
  }

  function handleClear() {
    context.clearValue();
    inputElement?.focus();
  }
</script>

<div
  data-slot="combobox-trigger-input"
  class={cn("relative inline-block w-full max-w-xs", disabled && "cursor-not-allowed opacity-50", className)}
>
  <ComboboxPrimitive.Input
    data-slot="combobox-trigger-input-control"
    aria-label={ariaLabel}
    {autocomplete}
    {clearOnDeselect}
    {defaultValue}
    {disabled}
    {placeholder}
    class={cn(inputVariants({ size: context.size }), "w-full disabled:cursor-not-allowed", iconStyles.padding)}
  >
    {#snippet child({ props })}
      <input
        {...props}
        bind:this={inputElement}
        data-slot="combobox-trigger-input-control"
        onblur={(event) => handleBlur(event, getPrimitiveOnBlur(props))}
        oninput={(event) => handleInput(event, getPrimitiveOnInput(props))}
      />
    {/snippet}
  </ComboboxPrimitive.Input>
  <button
    data-slot="combobox-trigger-input-clear"
    type="button"
    aria-label={clearLabel}
    class={cn(
      "absolute top-1/2 flex -translate-y-1/2 cursor-pointer bg-transparent p-0",
      "disabled:pointer-events-none disabled:opacity-0",
      iconStyles.clearRight,
    )}
    disabled={!context.canClear}
    onpointerdown={handleClearPointerDown}
    onclick={handleClear}
  >
    <XIcon aria-hidden="true" size={iconStyles.iconSize} />
  </button>
  <ComboboxPrimitive.Trigger
    data-slot="combobox-trigger-input-trigger"
    aria-label={showOptionsLabel}
    class={cn(
      "absolute top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-kumo-subtle",
      "m-0 bg-transparent p-0",
      iconStyles.caretRight,
    )}
  >
    <CaretDownIcon aria-hidden="true" size={iconStyles.iconSize} />
  </ComboboxPrimitive.Trigger>
</div>
