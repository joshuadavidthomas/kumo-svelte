<script lang="ts">
  import type { Snippet } from "svelte";
  import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { setRadioGroupContext } from "./context";
  import {
    KUMO_RADIO_DEFAULT_VARIANTS,
    type KumoRadioAppearance,
    type RadioControlPosition,
  } from "./variants";

  export interface RadioGroupProps {
    "aria-label"?: string;
    "aria-labelledby"?: string;
    appearance?: KumoRadioAppearance;
    children: Snippet;
    class?: string;
    controlPosition?: RadioControlPosition;
    defaultValue?: string;
    description?: Snippet | string;
    disabled?: boolean;
    error?: string;
    legend?: string;
    name?: string;
    onValueChange?: (value: string) => void;
    orientation?: "vertical" | "horizontal";
    required?: boolean;
    value?: string;
  }

  let {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    appearance = KUMO_RADIO_DEFAULT_VARIANTS.appearance,
    children,
    class: className,
    controlPosition,
    defaultValue = "",
    description,
    disabled = false,
    error,
    legend,
    name,
    onValueChange,
    orientation = "vertical",
    required,
    value,
  }: RadioGroupProps = $props();

  const generatedId = $props.id();

  let legendId = $derived(`${generatedId}-legend`);
  let groupAriaLabelledby = $derived(ariaLabelledby ?? (!ariaLabel ? legendId : undefined));
  let internalValue = $state<string | undefined>();
  let groupValue = $derived(value ?? internalValue ?? defaultValue);

  function handleValueChange(nextValue: string) {
    internalValue = nextValue;
    onValueChange?.(nextValue);
  }

  setRadioGroupContext({
    get appearance() {
      return appearance;
    },
    get controlPosition() {
      return controlPosition;
    },
    get legendId() {
      return legendId;
    },
  });
</script>

<RadioGroupPrimitive.Root
  data-slot="radio-group"
  aria-label={ariaLabel}
  aria-labelledby={groupAriaLabelledby}
  class={cn("flex flex-col gap-4", className)}
  value={groupValue}
  onValueChange={handleValueChange}
  {disabled}
  {name}
  {orientation}
  {required}
>
  {#if legend}
    <div id={legendId} class="text-base font-medium text-kumo-default">{legend}</div>
  {/if}
  <div
    class={cn(
      orientation === "vertical"
        ? cn("flex flex-col", appearance === "card" ? "gap-3" : "gap-2")
        : appearance === "card"
          ? "grid grid-cols-2 gap-3"
          : "flex flex-row flex-wrap gap-2",
    )}
  >
    {@render children()}
  </div>
  {#if error}
    <p class="text-sm text-kumo-danger">{error}</p>
  {/if}
  {#if description}
    <p class="text-sm text-kumo-subtle">
      {#if typeof description === "string"}
        {description}
      {:else}
        {@render description()}
      {/if}
    </p>
  {/if}
</RadioGroupPrimitive.Root>
