import { getContext, setContext } from "svelte";
import { KUMO_TOOLBAR_DEFAULT_VARIANTS, type ToolbarSize } from "./variants";

export interface ToolbarContextValue {
  readonly size: ToolbarSize;
}

const toolbarContextKey = Symbol("kumo-toolbar");

export function setToolbarContext(context: ToolbarContextValue) {
  setContext(toolbarContextKey, context);
}

export function getToolbarContext() {
  return (
    getContext<ToolbarContextValue | undefined>(toolbarContextKey) ?? {
      size: KUMO_TOOLBAR_DEFAULT_VARIANTS.size,
    }
  );
}
