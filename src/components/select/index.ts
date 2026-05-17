import type { ComponentProps } from "svelte";
import SelectGroupComponent from "./select-group.svelte";
import SelectGroupHeadingComponent from "./select-group-heading.svelte";
import SelectOptionComponent from "./select-option.svelte";
import SelectComponent from "./select.svelte";
import SelectSeparatorComponent from "./select-separator.svelte";

export { default as Select } from "./select.svelte";
export { default as SelectOption } from "./select-option.svelte";
export { default as SelectGroup } from "./select-group.svelte";
export { default as SelectGroupHeading } from "./select-group-heading.svelte";
export { default as SelectGroupLabel } from "./select-group-heading.svelte";
export { default as SelectSeparator } from "./select-separator.svelte";

export type SelectProps = ComponentProps<typeof SelectComponent>;
export type SelectOptionProps = ComponentProps<typeof SelectOptionComponent>;
export type SelectGroupProps = ComponentProps<typeof SelectGroupComponent>;
export type SelectGroupHeadingProps = ComponentProps<typeof SelectGroupHeadingComponent>;
export type SelectGroupLabelProps = SelectGroupHeadingProps;
export type SelectSeparatorProps = ComponentProps<typeof SelectSeparatorComponent>;

export {
  selectVariants,
  KUMO_SELECT_DEFAULT_VARIANTS,
  KUMO_SELECT_STYLING,
  KUMO_SELECT_TRIGGER_ICON_STYLES,
  KUMO_SELECT_VARIANTS,
  type KumoSelectSize,
  type KumoSelectVariantsProps,
  type SelectSize,
} from "./variants";
