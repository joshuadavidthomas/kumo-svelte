import type { ComponentProps } from "svelte";
import CollapsibleDefaultPanelComponent from "./collapsible-default-panel.svelte";
import CollapsibleDefaultTriggerComponent from "./collapsible-default-trigger.svelte";
import CollapsiblePanelComponent from "./collapsible-panel.svelte";
import CollapsibleRootComponent from "./collapsible-root.svelte";
import CollapsibleTriggerComponent from "./collapsible-trigger.svelte";

const Collapsible = Object.assign(CollapsibleRootComponent, {
  Root: CollapsibleRootComponent,
  Trigger: CollapsibleTriggerComponent,
  Panel: CollapsiblePanelComponent,
  Content: CollapsiblePanelComponent,
  DefaultTrigger: CollapsibleDefaultTriggerComponent,
  DefaultPanel: CollapsibleDefaultPanelComponent,
});

export {
  Collapsible,
  CollapsibleRootComponent as CollapsibleRoot,
  CollapsibleRootComponent as Root,
  CollapsibleTriggerComponent as CollapsibleTrigger,
  CollapsibleTriggerComponent as Trigger,
  CollapsiblePanelComponent as CollapsiblePanel,
  CollapsiblePanelComponent as CollapsibleContent,
  CollapsiblePanelComponent as Panel,
  CollapsiblePanelComponent as Content,
  CollapsibleDefaultTriggerComponent as CollapsibleDefaultTrigger,
  CollapsibleDefaultTriggerComponent as DefaultTrigger,
  CollapsibleDefaultPanelComponent as CollapsibleDefaultPanel,
  CollapsibleDefaultPanelComponent as DefaultPanel,
};

export type CollapsibleProps = ComponentProps<typeof CollapsibleRootComponent>;
export type CollapsibleRootProps = ComponentProps<typeof CollapsibleRootComponent>;
export type CollapsibleTriggerProps = ComponentProps<typeof CollapsibleTriggerComponent>;
export type CollapsiblePanelProps = ComponentProps<typeof CollapsiblePanelComponent>;
export type CollapsibleContentProps = CollapsiblePanelProps;
export type CollapsibleDefaultTriggerProps = ComponentProps<
  typeof CollapsibleDefaultTriggerComponent
>;
export type CollapsibleDefaultPanelProps = ComponentProps<typeof CollapsibleDefaultPanelComponent>;

export {
  collapsibleVariants,
  KUMO_COLLAPSIBLE_DEFAULT_VARIANTS,
  KUMO_COLLAPSIBLE_VARIANTS,
  type KumoCollapsibleVariantsProps,
} from "./variants";
