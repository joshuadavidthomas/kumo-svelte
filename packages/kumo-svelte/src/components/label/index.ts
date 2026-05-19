import type { ComponentProps } from "svelte";
import LabelComponent from "./label.svelte";

export { default as Label } from "./label.svelte";
export type LabelProps = ComponentProps<typeof LabelComponent>;
export {
  labelContentVariants,
  labelVariants,
  KUMO_LABEL_DEFAULT_VARIANTS,
  KUMO_LABEL_VARIANTS,
  type KumoLabelVariantsProps,
} from "./variants";
