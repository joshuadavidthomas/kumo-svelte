import { getContext, setContext } from "svelte";
import { KUMO_TABS_DEFAULT_VARIANTS, type KumoTabsSize, type KumoTabsVariant } from "./variants";

export interface TabsStyleContext {
  indicatorClassName?: string;
  indicatorStyle: string;
  size: KumoTabsSize;
  variant: KumoTabsVariant;
}

const TABS_STYLE_CONTEXT = Symbol("kumo-tabs-style");

export function setTabsStyleContext(context: TabsStyleContext) {
  setContext(TABS_STYLE_CONTEXT, context);
}

export function getTabsStyleContext() {
  return getContext<TabsStyleContext | undefined>(TABS_STYLE_CONTEXT);
}

export function resolveTabsSize(size?: KumoTabsSize, context?: TabsStyleContext) {
  return size ?? context?.size ?? KUMO_TABS_DEFAULT_VARIANTS.size;
}

export function resolveTabsVariant(variant?: KumoTabsVariant, context?: TabsStyleContext) {
  return variant ?? context?.variant ?? KUMO_TABS_DEFAULT_VARIANTS.variant;
}
