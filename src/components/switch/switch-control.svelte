<script lang="ts">
  import { Switch as SwitchPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import {
    KUMO_SWITCH_DEFAULT_VARIANTS,
    KUMO_SWITCH_SIZE_STYLES,
    type KumoSwitchSize,
    type SwitchVariant,
  } from "./variants";

  export interface SwitchControlProps {
    checked?: boolean;
    class?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    onCheckedChange?: (checked: boolean) => void;
    required?: boolean;
    size?: KumoSwitchSize;
    transitioning?: boolean;
    value?: string;
    variant?: SwitchVariant;
    "aria-label"?: string;
    "aria-labelledby"?: string;
  }

  let {
    checked = $bindable(false),
    class: className,
    disabled = false,
    id,
    name,
    onCheckedChange,
    required,
    size = KUMO_SWITCH_DEFAULT_VARIANTS.size,
    transitioning,
    value,
    variant = KUMO_SWITCH_DEFAULT_VARIANTS.variant,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  }: SwitchControlProps = $props();

  const squircleRadius =
    "rounded-[5px] supports-[corner-shape:squircle]:rounded-[10px] [corner-shape:squircle]";

  let sizeStyles = $derived(KUMO_SWITCH_SIZE_STYLES[size]);
  let trackColors = $derived(
    variant === "neutral"
      ? checked
        ? "bg-neutral-500 dark:bg-kumo-base ring-neutral-600 dark:ring-neutral-700"
        : "bg-neutral-150 dark:bg-kumo-base ring-kumo-hairline"
      : checked
        ? "bg-blue-500 dark:bg-blue-600 ring-blue-600 dark:ring-blue-500"
        : "bg-neutral-200 dark:bg-neutral-700 ring-neutral-300 dark:ring-neutral-600",
  );
  let thumbColors = $derived(
    variant === "neutral"
      ? checked
        ? "bg-kumo-base dark:bg-neutral-400"
        : "bg-kumo-base dark:bg-neutral-850"
      : checked
        ? "bg-kumo-base dark:bg-blue-300"
        : "bg-kumo-base dark:bg-neutral-850",
  );
</script>

<SwitchPrimitive.Root
  bind:checked
  {disabled}
  {id}
  {name}
  {required}
  {value}
  aria-busy={transitioning || undefined}
  aria-label={ariaLabel}
  aria-labelledby={ariaLabelledBy}
  onCheckedChange={onCheckedChange}
  class={cn(
    "relative inline-flex items-center ring cursor-pointer border-none p-0",
    "focus:outline-none focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand",
    "transition-colors duration-150 ease-out motion-reduce:transition-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    sizeStyles.track,
    squircleRadius,
    trackColors,
    className,
  )}
>
  <SwitchPrimitive.Thumb
    class={cn(
      "absolute top-0 bottom-0 shadow-[0_0_1px_0.5px_var(--color-kumo-shadow-edge),0_1px_2px_var(--color-kumo-shadow-drop)]",
      sizeStyles.thumb,
      squircleRadius,
      thumbColors,
      "transition-all duration-150 ease-out motion-reduce:transition-none",
      checked ? sizeStyles.slide : "left-0",
    )}
  />
</SwitchPrimitive.Root>
