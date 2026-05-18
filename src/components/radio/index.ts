import type { ComponentProps } from "svelte";
import RadioGroupComponent from "./radio-group.svelte";
import RadioItemComponent from "./radio-item.svelte";
import RadioLegendComponent from "./radio-legend.svelte";

export { default as Radio } from "./radio-group.svelte";
export { default as RadioGroup } from "./radio-group.svelte";
export { default as RadioItem } from "./radio-item.svelte";
export { default as RadioGroupItem } from "./radio-item.svelte";
export { default as RadioLegend } from "./radio-legend.svelte";

export type RadioGroupProps = ComponentProps<typeof RadioGroupComponent>;
export type RadioItemProps = ComponentProps<typeof RadioItemComponent>;
export type RadioGroupItemProps = RadioItemProps;
export type RadioLegendProps = ComponentProps<typeof RadioLegendComponent>;

export {
  radioVariants,
  KUMO_RADIO_DEFAULT_VARIANTS,
  KUMO_RADIO_VARIANTS,
  type KumoRadioAppearance,
  type KumoRadioVariant,
  type KumoRadioVariantsProps,
  type RadioControlPosition,
  type RadioVariant,
} from "./variants";
