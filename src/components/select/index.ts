import type { ComponentProps } from "svelte";
import SelectContentComponent from "./select-content.svelte";
import SelectGroupComponent from "./select-group.svelte";
import SelectGroupHeadingComponent from "./select-group-heading.svelte";
import SelectOptionComponent from "./select-option.svelte";
import SelectPortalComponent from "./select-portal.svelte";
import SelectRootComponent from "./select-root.svelte";
import SelectComponent from "./select.svelte";
import SelectSeparatorComponent from "./select-separator.svelte";
import SelectTriggerComponent from "./select-trigger.svelte";
import SelectValueComponent from "./select-value.svelte";
import SelectViewportComponent from "./select-viewport.svelte";

export { default as Select } from "./select.svelte";
export { default as SelectRoot } from "./select-root.svelte";
export { default as SelectTrigger } from "./select-trigger.svelte";
export { default as SelectValue } from "./select-value.svelte";
export { default as SelectPortal } from "./select-portal.svelte";
export { default as SelectContent } from "./select-content.svelte";
export { default as SelectViewport } from "./select-viewport.svelte";
export { default as SelectOption } from "./select-option.svelte";
export { default as SelectItem } from "./select-option.svelte";
export { default as SelectGroup } from "./select-group.svelte";
export { default as SelectGroupHeading } from "./select-group-heading.svelte";
export { default as SelectGroupLabel } from "./select-group-heading.svelte";
export { default as SelectSeparator } from "./select-separator.svelte";

export type SelectProps = ComponentProps<typeof SelectComponent>;
export type SelectRootProps = ComponentProps<typeof SelectRootComponent>;
export type SelectTriggerProps = ComponentProps<typeof SelectTriggerComponent>;
export type SelectValueProps = ComponentProps<typeof SelectValueComponent>;
export type SelectPortalProps = ComponentProps<typeof SelectPortalComponent>;
export type SelectContentProps = ComponentProps<typeof SelectContentComponent>;
export type SelectViewportProps = ComponentProps<typeof SelectViewportComponent>;
export type SelectOptionProps = ComponentProps<typeof SelectOptionComponent>;
export type SelectItemProps = SelectOptionProps;
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
