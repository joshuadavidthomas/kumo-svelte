<script lang="ts">
  import { flushSync, type Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { inputVariants } from "../input";
  import ComboboxChip from "./combobox-chip.svelte";
  import { getComboboxContext } from "./context";
  import type { KumoComboboxInputSide, KumoComboboxSize } from "./variants";

  const sizeToMinHeight: Record<KumoComboboxSize, string> = {
    xs: "min-h-5",
    sm: "min-h-6.5",
    base: "min-h-9",
    lg: "min-h-10",
  };

  type PrimitiveFocusHandler = (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
  type PrimitiveInputHandler = (event: Event & { currentTarget: HTMLInputElement }) => void;

  export interface ComboboxTriggerMultipleWithInputProps {
    children?: Snippet<[value: string]>;
    class?: string;
    clearOnDeselect?: boolean;
    disabled?: boolean;
    inputSide?: KumoComboboxInputSide;
    onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
    oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    renderItem?: Snippet<[value: string]>;
  }

  let {
    children,
    class: className,
    clearOnDeselect = true,
    disabled,
    inputSide = "right",
    onblur,
    oninput,
    onValueChange,
    placeholder,
    renderItem,
  }: ComboboxTriggerMultipleWithInputProps = $props();

  const context = getComboboxContext("TriggerMultipleWithInput");
  let inputElement = $state<HTMLInputElement>();

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

<div
  data-slot="combobox-trigger-multiple-with-input"
  class={cn(
    inputVariants({ size: context.size }),
    "flex h-auto flex-col gap-1 px-1.5 py-1",
    sizeToMinHeight[context.size],
    disabled && "cursor-not-allowed opacity-50",
    className,
  )}
>
  {#if inputSide === "top"}
    <ComboboxPrimitive.Input {clearOnDeselect} {disabled} {placeholder} class="w-full border-0 bg-inherit px-2 py-1">
      {#snippet child({ props })}
        <input
          {...props}
          bind:this={inputElement}
          value={context.inputValue}
          onblur={(event) => handleBlur(event, getPrimitiveOnBlur(props))}
          oninput={(event) => handleInput(event, getPrimitiveOnInput(props))}
        />
      {/snippet}
    </ComboboxPrimitive.Input>
  {/if}

  <div class="flex flex-1 flex-wrap items-center gap-1.5">
    {#each context.selectedValues as selectedValue (selectedValue)}
      {#if renderItem}
        {@render renderItem(selectedValue)}
      {:else if children}
        {@render children(selectedValue)}
      {:else}
        <ComboboxChip value={selectedValue}>{selectedValue}</ComboboxChip>
      {/if}
    {/each}

    {#if inputSide === "right"}
      <ComboboxPrimitive.Input {clearOnDeselect} {disabled} {placeholder} class="min-w-[100px] flex-1 border-0 bg-inherit px-2 py-1">
        {#snippet child({ props })}
          <input
            {...props}
            bind:this={inputElement}
            value={context.inputValue}
            onblur={(event) => handleBlur(event, getPrimitiveOnBlur(props))}
            oninput={(event) => handleInput(event, getPrimitiveOnInput(props))}
          />
        {/snippet}
      </ComboboxPrimitive.Input>
    {/if}
  </div>
</div>
