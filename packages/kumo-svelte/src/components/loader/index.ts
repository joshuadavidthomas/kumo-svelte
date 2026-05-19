import type { ComponentProps } from "svelte";
import LoaderComponent from "./loader.svelte";
import SkeletonLineComponent from "./skeleton-line.svelte";

export { default as Loader } from "./loader.svelte";
export { default as SkeletonLine } from "./skeleton-line.svelte";

export type LoaderProps = ComponentProps<typeof LoaderComponent>;
export type SkeletonLineProps = ComponentProps<typeof SkeletonLineComponent>;

export {
  loaderVariants,
  KUMO_LOADER_DEFAULT_VARIANTS,
  KUMO_LOADER_VARIANTS,
  type KumoLoaderSize,
  type KumoLoaderVariantsProps,
} from "./variants";
