import type { ComponentProps } from "svelte";
import DeleteResourceComponent from "./delete-resource.svelte";

export { default as DeleteResource } from "./delete-resource.svelte";
export {
  KUMO_DELETE_RESOURCE_DEFAULT_VARIANTS,
  KUMO_DELETE_RESOURCE_VARIANTS,
  type KumoDeleteResourceSize,
  type KumoDeleteResourceVariantsProps,
} from "./variants";
export type DeleteResourceProps = ComponentProps<typeof DeleteResourceComponent>;
