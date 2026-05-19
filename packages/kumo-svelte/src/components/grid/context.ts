import { getContext, setContext } from "svelte";
import type { KumoGridGap, KumoGridVariant } from "./variants";

const GRID_CONTEXT = Symbol("kumo-grid");

export interface GridContextValue {
  readonly gap: KumoGridGap;
  readonly mobileDivider?: boolean;
  readonly variant?: KumoGridVariant;
}

export function setGridContext(value: GridContextValue) {
  setContext(GRID_CONTEXT, value);
}

export function getGridContext() {
  return getContext<GridContextValue | undefined>(GRID_CONTEXT);
}
