import type { ComponentProps } from "svelte";
import CheckboxComponent from "./checkbox.svelte";
import CheckboxGroupComponent from "./checkbox-group.svelte";
import CheckboxItemComponent from "./checkbox-item.svelte";
import CheckboxLegendComponent from "./checkbox-legend.svelte";

export { default as Checkbox } from "./checkbox.svelte";
export { default as CheckboxGroup } from "./checkbox-group.svelte";
export { default as CheckboxItem } from "./checkbox-item.svelte";
export { default as CheckboxLegend } from "./checkbox-legend.svelte";
export type CheckboxProps = ComponentProps<typeof CheckboxComponent>;
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
