import type { ComponentProps } from "svelte";
import TabsComponent from "./tabs.svelte";
import TabsContentComponent from "./tabs-content.svelte";
import TabsListComponent from "./tabs-list.svelte";
import TabsRootComponent from "./tabs-root.svelte";
import TabsTriggerComponent from "./tabs-trigger.svelte";

export { default as Tabs } from "./tabs.svelte";
export { default as TabsRoot } from "./tabs-root.svelte";
export { default as TabsList } from "./tabs-list.svelte";
export { default as TabsTrigger } from "./tabs-trigger.svelte";
export { default as TabsContent } from "./tabs-content.svelte";

export type TabsProps = ComponentProps<typeof TabsComponent>;
export type TabsItem = NonNullable<TabsProps["tabs"]>[number];
export type TabsRootProps = ComponentProps<typeof TabsRootComponent>;
export type TabsListProps = ComponentProps<typeof TabsListComponent>;
export type TabsTriggerProps = ComponentProps<typeof TabsTriggerComponent>;
export type TabsContentProps = ComponentProps<typeof TabsContentComponent>;

export {
  tabsListVariants,
  tabsTriggerVariants,
  KUMO_TABS_DEFAULT_VARIANTS,
  KUMO_TABS_STYLING,
  KUMO_TABS_VARIANTS,
  type KumoTabsSize,
  type KumoTabsVariant,
  type KumoTabsVariantsProps,
} from "./variants";
