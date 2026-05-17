<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import {
    KUMO_TABS_DEFAULT_VARIANTS,
    tabsListVariants,
    tabsTriggerVariants,
    type KumoTabsSize,
    type KumoTabsVariant,
  } from "./variants";

  export interface TabsItem {
    class?: string;
    disabled?: boolean;
    label: Snippet | string;
    value: string;
  }

  export interface TabsProps {
    activateOnFocus?: boolean;
    class?: string;
    indicatorClassName?: string;
    listClassName?: string;
    onValueChange?: (value: string) => void;
    selectedValue?: string;
    size?: KumoTabsSize;
    tabs?: TabsItem[];
    value?: string;
    variant?: KumoTabsVariant;
  }

  let {
    activateOnFocus = false,
    class: className,
    indicatorClassName: _indicatorClassName,
    listClassName,
    onValueChange,
    selectedValue,
    size = KUMO_TABS_DEFAULT_VARIANTS.size,
    tabs = [],
    value,
    variant = KUMO_TABS_DEFAULT_VARIANTS.variant,
  }: TabsProps = $props();

  let fallbackValue = $derived(tabs[0]?.value ?? "");
  let internalValue = $state<string | undefined>();
  let activeValue = $derived(value ?? internalValue ?? selectedValue ?? fallbackValue);
  let activationMode = $derived<"automatic" | "manual">(
    activateOnFocus ? "automatic" : "manual",
  );
  let isSegmented = $derived(variant === "segmented");

  function handleValueChange(nextValue: string) {
    internalValue = nextValue;
    onValueChange?.(nextValue);
  }
</script>

{#if tabs.length > 0}
  <TabsPrimitive.Root
    value={activeValue}
    onValueChange={handleValueChange}
    activationMode={activationMode}
    class={cn("relative isolate min-w-0 font-medium", className)}
  >
    {#if isSegmented}
      <div
        class={cn(
          "absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 rounded-lg bg-kumo-recessed",
          size === "sm" ? "h-6.5" : "h-9",
        )}
      ></div>
    {/if}
    <TabsPrimitive.List class={cn(tabsListVariants({ size, variant }), listClassName)}>
      {#each tabs as tab (tab.value)}
        <TabsPrimitive.Trigger
          value={tab.value}
          disabled={tab.disabled}
          class={cn(tabsTriggerVariants({ size, variant }), "cursor-pointer", tab.class)}
        >
          {#if typeof tab.label === "string"}
            {tab.label}
          {:else}
            {@render tab.label()}
          {/if}
        </TabsPrimitive.Trigger>
      {/each}
    </TabsPrimitive.List>
  </TabsPrimitive.Root>
{/if}
