<script lang="ts">
  import type { Snippet } from "svelte";
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon.svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { inputVariants } from "../input";
  import { getComboboxContext } from "./context";

  const triggerValueIconStyles = {
    xs: { padding: "pr-5", iconSize: 12, iconRight: "right-1" },
    sm: { padding: "pr-6", iconSize: 14, iconRight: "right-1.5" },
    base: { padding: "pr-8", iconSize: 16, iconRight: "right-2" },
    lg: { padding: "pr-10", iconSize: 18, iconRight: "right-3" },
  } as const;

  export interface ComboboxTriggerProps {
    children?: Snippet;
    class?: string;
    placeholder?: string;
  }

  let {
    children,
    class: className,
    placeholder,
  }: ComboboxTriggerProps = $props();

  const context = getComboboxContext("Trigger");
  let iconStyles = $derived(triggerValueIconStyles[context.size]);
</script>

<ComboboxPrimitive.Trigger
  class={cn(
    inputVariants({ size: context.size }),
    "relative flex items-center data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[placeholder]:text-kumo-placeholder",
    iconStyles.padding,
    className,
  )}
>
  <span class="min-w-0 truncate">
    {#if children}
      {@render children()}
    {:else}
      {placeholder}
    {/if}
  </span>
  <span
    class={cn(
      "absolute top-1/2 flex -translate-y-1/2 items-center text-kumo-subtle",
      iconStyles.iconRight,
    )}
  >
    <CaretDownIcon aria-hidden="true" size={iconStyles.iconSize} />
  </span>
</ComboboxPrimitive.Trigger>
