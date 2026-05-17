import type { ComponentProps } from "svelte";
import CollapsibleDefaultPanelComponent from "./collapsible-default-panel.svelte";
import CollapsibleDefaultTriggerComponent from "./collapsible-default-trigger.svelte";
import CollapsiblePanelComponent from "./collapsible-panel.svelte";
import CollapsibleRootComponent from "./collapsible-root.svelte";
import CollapsibleTriggerComponent from "./collapsible-trigger.svelte";

export { default as Collapsible } from "./collapsible-root.svelte";
export { default as CollapsibleRoot } from "./collapsible-root.svelte";
export { default as CollapsibleTrigger } from "./collapsible-trigger.svelte";
export { default as CollapsiblePanel } from "./collapsible-panel.svelte";
export { default as CollapsibleDefaultTrigger } from "./collapsible-default-trigger.svelte";
export { default as CollapsibleDefaultPanel } from "./collapsible-default-panel.svelte";

export type CollapsibleProps = ComponentProps<typeof CollapsibleRootComponent>;
export type CollapsibleRootProps = ComponentProps<typeof CollapsibleRootComponent>;
export type CollapsibleTriggerProps = ComponentProps<typeof CollapsibleTriggerComponent>;
export type CollapsiblePanelProps = ComponentProps<typeof CollapsiblePanelComponent>;
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
