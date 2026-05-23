<script lang="ts">
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getTabsStyleContext, resolveTabsSize, resolveTabsVariant } from "./context";
  import {
    tabsListVariants,
    type KumoTabsSize,
    type KumoTabsVariant,
  } from "./variants";

  export type TabsListProps = TabsPrimitive.ListProps & {
    size?: KumoTabsSize;
    variant?: KumoTabsVariant;
  };

  let { children, class: className, size, variant, ...restProps }: TabsListProps = $props();

  const tabsStyle = getTabsStyleContext();
  let resolvedSize = $derived(resolveTabsSize(size, tabsStyle));
  let resolvedVariant = $derived(resolveTabsVariant(variant, tabsStyle));
</script>

<TabsPrimitive.List
  data-slot="tabs-list"
  data-variant={resolvedVariant}
  class={cn(tabsListVariants({ size: resolvedSize, variant: resolvedVariant }), className)}
  {...restProps}
>
  {@render children?.()}
  {#if tabsStyle?.indicatorStyle}
    <div
      class={cn(
        "pointer-events-none absolute left-0 z-1 w-(--active-tab-width) translate-x-(--active-tab-left) transition-all duration-200",
        resolvedVariant === "segmented" &&
          "top-(--active-tab-top) h-(--active-tab-height) bg-kumo-base shadow-sm ring ring-kumo-line",
        resolvedVariant === "segmented" && (resolvedSize === "sm" ? "rounded" : "rounded-md"),
        resolvedVariant === "underline" && "bottom-0 h-0.5 bg-kumo-brand",
        tabsStyle.indicatorClassName,
      )}
      style={tabsStyle.indicatorStyle}
    ></div>
  {/if}
</TabsPrimitive.List>
