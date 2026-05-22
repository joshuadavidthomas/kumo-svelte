import type { ComponentProps } from "svelte";
import RadioGroupComponent from "./radio-group.svelte";
import RadioItemComponent from "./radio-item.svelte";
import RadioLegendComponent from "./radio-legend.svelte";

export {
  RadioGroupComponent as Radio,
  RadioGroupComponent as RadioRoot,
  RadioGroupComponent as RadioGroup,
  RadioGroupComponent as Root,
  RadioGroupComponent as Group,
  RadioItemComponent as RadioItem,
  RadioItemComponent as RadioGroupItem,
  RadioItemComponent as Item,
  RadioItemComponent as GroupItem,
  RadioLegendComponent as RadioLegend,
  RadioLegendComponent as Legend,
};

export type RadioProps = ComponentProps<typeof RadioGroupComponent>;
export type RadioRootProps = RadioProps;
export type RadioGroupProps = RadioProps;
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
