<script lang="ts">
  import type { Snippet } from "svelte";
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
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
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    children?: Snippet;
    class?: string;
    placeholder?: string;
  }

  let {
    child,
    children,
    class: className,
    placeholder,
  }: ComboboxTriggerProps = $props();

  const context = getComboboxContext("Trigger");
  let iconStyles = $derived(triggerValueIconStyles[context.size]);
</script>

<ComboboxPrimitive.Trigger
  data-slot="combobox-trigger"
  {child}
  class={cn(
    !child && inputVariants({ size: context.size }),
    !child &&
      "relative flex items-center data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[placeholder]:text-kumo-placeholder",
    !child && iconStyles.padding,
    className,
  )}
>
  {#if !child}
    <span data-slot="combobox-trigger-value" class="min-w-0 truncate">
      {#if children}
        {@render children()}
      {:else}
        {placeholder}
      {/if}
    </span>
    <span
      data-slot="combobox-trigger-icon"
      class={cn(
        "absolute top-1/2 flex -translate-y-1/2 items-center text-kumo-subtle",
        iconStyles.iconRight,
      )}
    >
      <CaretDownIcon aria-hidden="true" size={iconStyles.iconSize} />
    </span>
  {/if}
</ComboboxPrimitive.Trigger>
