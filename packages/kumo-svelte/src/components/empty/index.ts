import type { ComponentProps } from "svelte";
import EmptyComponent from "./empty.svelte";

export { default as Empty } from "./empty.svelte";
export type EmptyProps = ComponentProps<typeof EmptyComponent>;
export {
  emptyVariants,
  KUMO_EMPTY_DEFAULT_VARIANTS,
  KUMO_EMPTY_VARIANTS,
  type KumoEmptySize,
  type KumoEmptyVariantsProps,
} from "./variants";
