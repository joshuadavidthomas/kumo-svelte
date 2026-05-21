<script lang="ts">
  import { onMount, tick, type Snippet } from "svelte";
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
    value = $bindable(selectedValue ?? tabs[0]?.value ?? ""),
    variant = KUMO_TABS_DEFAULT_VARIANTS.variant,
  }: TabsProps = $props();
  let rootEl = $state<HTMLElement | null>(null);
  let indicatorStyle = $state("");
  let activationMode = $derived<"automatic" | "manual">(
    activateOnFocus ? "automatic" : "manual",
  );
  let isSegmented = $derived(variant === "segmented");

  function updateIndicator() {
    if (!rootEl || !isSegmented) {
      indicatorStyle = "";
      return;
    }

    const list = rootEl.querySelector<HTMLElement>('[data-slot="tabs-list"]');
    const active = rootEl.querySelector<HTMLElement>('[data-slot="tabs-trigger"][data-state="active"]');

    if (!list || !active) {
      indicatorStyle = "";
      return;
    }

    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const left = activeRect.left - listRect.left + list.scrollLeft;

    indicatorStyle = `--active-tab-left: ${left}px; --active-tab-top: ${active.offsetTop}px; --active-tab-width: ${activeRect.width}px; --active-tab-height: ${activeRect.height}px;`;
  }

  function handleValueChange(nextValue: string) {
    value = nextValue;
    onValueChange?.(nextValue);
    tick().then(updateIndicator);
  }

  $effect(() => {
    void [value, tabs, size, variant];
    tick().then(updateIndicator);
  });

  onMount(() => {
    updateIndicator();
    const list = rootEl?.querySelector<HTMLElement>('[data-slot="tabs-list"]');
    if (!list) return;

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(list);
    for (const trigger of list.querySelectorAll('[data-slot="tabs-trigger"]')) {
      observer.observe(trigger);
    }

    return () => observer.disconnect();
  });
</script>

{#if tabs.length > 0}
  <div bind:this={rootEl}>
    <TabsRoot
      bind:value
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
      {#if isSegmented && indicatorStyle}
        <div
          class={cn(
            "absolute left-0 z-1 w-(--active-tab-width) translate-x-(--active-tab-left) transition-all duration-200",
            "top-(--active-tab-top) h-(--active-tab-height) bg-kumo-base shadow-sm ring ring-kumo-line",
            size === "sm" ? "rounded" : "rounded-md",
            _indicatorClassName,
          )}
          style={indicatorStyle}
        ></div>
      {/if}
      </TabsList>
    </TabsRoot>
  </div>
{/if}
