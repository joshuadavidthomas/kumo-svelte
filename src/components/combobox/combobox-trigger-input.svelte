<script lang="ts">
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon.svelte";
  import XIcon from "phosphor-svelte/lib/XIcon.svelte";
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

  export interface ComboboxTriggerInputProps {
    "aria-label"?: string;
    autocomplete?: HTMLInputAttributes["autocomplete"];
    class?: string;
    clearLabel?: string;
    defaultValue?: string;
    disabled?: boolean;
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
    defaultValue,
    disabled,
    oninput,
    onValueChange,
    placeholder,
    showOptionsLabel = "Show options",
  }: ComboboxTriggerInputProps = $props();

  const context = getComboboxContext("TriggerInput");
  let iconStyles = $derived(triggerInputIconStyles[context.size]);

  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    context.setInputValue(event.currentTarget.value);
    oninput?.(event);
    onValueChange?.(event.currentTarget.value);
  }
</script>

<div
  class={cn(
    "relative inline-block w-full max-w-xs",
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
    className,
  )}
>
  <ComboboxPrimitive.Input
    aria-label={ariaLabel}
    {autocomplete}
    {defaultValue}
    {disabled}
    oninput={handleInput}
    {placeholder}
    class={cn(inputVariants({ size: context.size }), "w-full disabled:cursor-not-allowed", iconStyles.padding)}
  />
  <button
    type="button"
    aria-label={clearLabel}
    class={cn(
      "absolute top-1/2 flex -translate-y-1/2 cursor-pointer bg-transparent p-0",
      iconStyles.clearRight,
    )}
    onclick={() => context.setInputValue("")}
  >
    <XIcon aria-hidden="true" size={iconStyles.iconSize} />
  </button>
  <ComboboxPrimitive.Trigger
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
