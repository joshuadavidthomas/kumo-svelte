<script lang="ts">
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import {
    KUMO_TABS_DEFAULT_VARIANTS,
    tabsListVariants,
    type KumoTabsSize,
    type KumoTabsVariant,
  } from "./variants";

  export type TabsListProps = TabsPrimitive.ListProps & {
    size?: KumoTabsSize;
    variant?: KumoTabsVariant;
  };

  let {
    class: className,
    size = KUMO_TABS_DEFAULT_VARIANTS.size,
    variant = KUMO_TABS_DEFAULT_VARIANTS.variant,
    ...restProps
  }: TabsListProps = $props();
</script>

<TabsPrimitive.List
  data-slot="tabs-list"
  data-variant={variant}
  class={cn(tabsListVariants({ size, variant }), className)}
  {...restProps}
/>
