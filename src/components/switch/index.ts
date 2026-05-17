import type { ComponentProps } from "svelte";
import SwitchComponent from "./switch.svelte";
import SwitchGroupComponent from "./switch-group.svelte";
import SwitchItemComponent from "./switch-item.svelte";
import SwitchLegendComponent from "./switch-legend.svelte";

export { default as Switch } from "./switch.svelte";
export { default as SwitchGroup } from "./switch-group.svelte";
export { default as SwitchItem } from "./switch-item.svelte";
export { default as SwitchLegend } from "./switch-legend.svelte";

export type SwitchProps = ComponentProps<typeof SwitchComponent>;
export type SwitchGroupProps = ComponentProps<typeof SwitchGroupComponent>;
export type SwitchItemProps = ComponentProps<typeof SwitchItemComponent>;
export type SwitchLegendProps = ComponentProps<typeof SwitchLegendComponent>;

export {
  switchVariants,
  KUMO_SWITCH_DEFAULT_VARIANTS,
  KUMO_SWITCH_SIZE_STYLES,
  KUMO_SWITCH_VARIANTS,
  type KumoSwitchSize,
  type KumoSwitchVariant,
  type KumoSwitchVariantsProps,
  type SwitchSize,
  type SwitchVariant,
} from "./variants";
