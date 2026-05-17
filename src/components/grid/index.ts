import type { ComponentProps } from "svelte";
import GridItemComponent from "./grid-item.svelte";
import GridComponent from "./grid.svelte";

export { default as Grid } from "./grid.svelte";
export { default as GridItem } from "./grid-item.svelte";

export type GridProps = ComponentProps<typeof GridComponent>;
export type GridItemProps = ComponentProps<typeof GridItemComponent>;

export {
  gridItemVariants,
  gridVariants,
  KUMO_GRID_DEFAULT_VARIANTS,
  KUMO_GRID_VARIANTS,
  type KumoGridGap,
  type KumoGridItemVariantsProps,
  type KumoGridVariant,
  type KumoGridVariantsProps,
} from "./variants";
