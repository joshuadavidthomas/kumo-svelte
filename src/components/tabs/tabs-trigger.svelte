<script lang="ts">
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import {
    KUMO_TABS_DEFAULT_VARIANTS,
    tabsTriggerVariants,
    type KumoTabsSize,
    type KumoTabsVariant,
  } from "./variants";

  export type TabsTriggerProps = TabsPrimitive.TriggerProps & {
    size?: KumoTabsSize;
    variant?: KumoTabsVariant;
  };

  let {
    class: className,
    size = KUMO_TABS_DEFAULT_VARIANTS.size,
    variant = KUMO_TABS_DEFAULT_VARIANTS.variant,
    ...restProps
  }: TabsTriggerProps = $props();
</script>

<TabsPrimitive.Trigger
  data-slot="tabs-trigger"
  data-variant={variant}
  class={cn(tabsTriggerVariants({ size, variant }), className)}
  {...restProps}
/>
