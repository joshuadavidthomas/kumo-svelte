import type { ComponentProps } from "svelte";
import SwitchControlComponent from "./switch-control.svelte";
import SwitchComponent from "./switch.svelte";
import SwitchGroupComponent from "./switch-group.svelte";
import SwitchItemComponent from "./switch-item.svelte";
import SwitchLegendComponent from "./switch-legend.svelte";

export {
  SwitchComponent as Switch,
  SwitchComponent as SwitchRoot,
  SwitchComponent as Root,
  SwitchControlComponent as SwitchControl,
  SwitchControlComponent as Control,
  SwitchGroupComponent as SwitchGroup,
  SwitchGroupComponent as Group,
  SwitchItemComponent as SwitchItem,
  SwitchItemComponent as Item,
  SwitchLegendComponent as SwitchLegend,
  SwitchLegendComponent as Legend,
};

export type SwitchProps = ComponentProps<typeof SwitchComponent>;
export type SwitchRootProps = SwitchProps;
export type SwitchControlProps = ComponentProps<typeof SwitchControlComponent>;
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
