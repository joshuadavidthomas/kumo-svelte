import type { ComponentProps } from "svelte";
import TabsComponent from "./tabs.svelte";
import TabsContentComponent from "./tabs-content.svelte";
import TabsListComponent from "./tabs-list.svelte";
import TabsRootComponent from "./tabs-root.svelte";
import TabsTriggerComponent from "./tabs-trigger.svelte";

export {
  TabsComponent as Tabs,
  TabsRootComponent as Root,
  TabsRootComponent as TabsRoot,
  TabsListComponent as TabsList,
  TabsListComponent as List,
  TabsTriggerComponent as TabsTrigger,
  TabsTriggerComponent as Trigger,
  TabsContentComponent as TabsContent,
  TabsContentComponent as Content,
};

export type TabsProps = ComponentProps<typeof TabsComponent>;
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
