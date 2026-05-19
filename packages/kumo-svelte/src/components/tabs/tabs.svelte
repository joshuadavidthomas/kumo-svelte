<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";
  import TabsList from "./tabs-list.svelte";
  import TabsRoot from "./tabs-root.svelte";
  import TabsTrigger from "./tabs-trigger.svelte";
  import {
    KUMO_TABS_DEFAULT_VARIANTS,
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
  <TabsRoot
    value={activeValue}
    onValueChange={handleValueChange}
    activationMode={activationMode}
    class={className}
  >
    {#if isSegmented}
      <div
        class={cn(
          "absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 rounded-lg bg-kumo-recessed",
          size === "sm" ? "h-6.5" : "h-9",
        )}
      ></div>
    {/if}
    <TabsList {size} {variant} class={listClassName}>
      {#each tabs as tab (tab.value)}
        <TabsTrigger
          value={tab.value}
          disabled={tab.disabled}
          {size}
          {variant}
          class={cn("cursor-pointer", tab.class)}
        >
          {#if typeof tab.label === "string"}
            {tab.label}
          {:else}
            {@render tab.label()}
          {/if}
        </TabsTrigger>
      {/each}
    </TabsList>
  </TabsRoot>
{/if}
