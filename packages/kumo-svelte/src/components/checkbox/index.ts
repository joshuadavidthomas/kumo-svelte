import type { ComponentProps } from "svelte";
import CheckboxComponent from "./checkbox.svelte";
import CheckboxGroupComponent from "./checkbox-group.svelte";
import CheckboxItemComponent from "./checkbox-item.svelte";
import CheckboxLegendComponent from "./checkbox-legend.svelte";

export {
  CheckboxComponent as Checkbox,
  CheckboxComponent as CheckboxRoot,
  CheckboxComponent as Root,
  CheckboxGroupComponent as CheckboxGroup,
  CheckboxGroupComponent as Group,
  CheckboxItemComponent as CheckboxItem,
  CheckboxItemComponent as Item,
  CheckboxLegendComponent as CheckboxLegend,
  CheckboxLegendComponent as Legend,
};
export type CheckboxProps = ComponentProps<typeof CheckboxComponent>;
export type CheckboxRootProps = CheckboxProps;
export type CheckboxGroupProps = ComponentProps<typeof CheckboxGroupComponent>;
export type CheckboxItemProps = ComponentProps<typeof CheckboxItemComponent>;
export type CheckboxLegendProps = ComponentProps<typeof CheckboxLegendComponent>;
export {
  checkboxVariants,
  KUMO_CHECKBOX_DEFAULT_VARIANTS,
  KUMO_CHECKBOX_VARIANTS,
  type CheckboxVariant,
  type KumoCheckboxVariant,
  type KumoCheckboxVariantsProps,
} from "./variants";
export type CheckboxChangeEventDetails = boolean;
