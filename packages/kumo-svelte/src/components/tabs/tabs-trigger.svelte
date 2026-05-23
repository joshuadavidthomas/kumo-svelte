<script lang="ts">
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getTabsStyleContext, resolveTabsSize, resolveTabsVariant } from "./context";
  import {
    tabsTriggerVariants,
    type KumoTabsSize,
    type KumoTabsVariant,
  } from "./variants";

  export type TabsTriggerProps = TabsPrimitive.TriggerProps & {
    size?: KumoTabsSize;
    variant?: KumoTabsVariant;
  };

  let { class: className, size, variant, ...restProps }: TabsTriggerProps = $props();

  const tabsStyle = getTabsStyleContext();
  let resolvedSize = $derived(resolveTabsSize(size, tabsStyle));
  let resolvedVariant = $derived(resolveTabsVariant(variant, tabsStyle));
</script>

<TabsPrimitive.Trigger
  data-slot="tabs-trigger"
  data-variant={resolvedVariant}
  class={cn(tabsTriggerVariants({ size: resolvedSize, variant: resolvedVariant }), className)}
  {...restProps}
/>
