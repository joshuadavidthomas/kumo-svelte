import type { ComponentProps } from "svelte";
import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import DropdownMenuCheckboxItemComponent from "./dropdown-checkbox-item.svelte";
import DropdownMenuContentComponent from "./dropdown-content.svelte";
import DropdownMenuItemComponent from "./dropdown-item.svelte";
import DropdownMenuLabelComponent from "./dropdown-label.svelte";
import DropdownMenuLinkItemComponent from "./dropdown-link-item.svelte";
import DropdownMenuRadioItemComponent from "./dropdown-radio-item.svelte";
import DropdownMenuRootComponent from "./dropdown-root.svelte";
import DropdownMenuSeparatorComponent from "./dropdown-separator.svelte";
import DropdownMenuShortcutComponent from "./dropdown-shortcut.svelte";
import DropdownMenuSubContentComponent from "./dropdown-sub-content.svelte";
import DropdownMenuSubTriggerComponent from "./dropdown-sub-trigger.svelte";
import DropdownMenuTriggerComponent from "./dropdown-trigger.svelte";

export { default as DropdownMenu } from "./dropdown-root.svelte";
export { default as DropdownMenuRoot } from "./dropdown-root.svelte";
export { default as DropdownMenuTrigger } from "./dropdown-trigger.svelte";
export { default as DropdownMenuContent } from "./dropdown-content.svelte";
export { default as DropdownMenuItem } from "./dropdown-item.svelte";
export { default as DropdownMenuLinkItem } from "./dropdown-link-item.svelte";
export { default as DropdownMenuCheckboxItem } from "./dropdown-checkbox-item.svelte";
export { default as DropdownMenuRadioItem } from "./dropdown-radio-item.svelte";
export { default as DropdownMenuLabel } from "./dropdown-label.svelte";
export { default as DropdownMenuSeparator } from "./dropdown-separator.svelte";
export { default as DropdownMenuShortcut } from "./dropdown-shortcut.svelte";
export { default as DropdownMenuSubTrigger } from "./dropdown-sub-trigger.svelte";
export { default as DropdownMenuSubContent } from "./dropdown-sub-content.svelte";
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuCheckboxGroup = DropdownMenuPrimitive.CheckboxGroup;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export type DropdownMenuRootProps = ComponentProps<typeof DropdownMenuRootComponent>;
export type DropdownMenuTriggerProps = ComponentProps<typeof DropdownMenuTriggerComponent>;
export type DropdownMenuContentProps = ComponentProps<typeof DropdownMenuContentComponent>;
export type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuItemComponent>;
export type DropdownMenuLinkItemProps = ComponentProps<typeof DropdownMenuLinkItemComponent>;
export type DropdownMenuCheckboxItemProps = ComponentProps<
  typeof DropdownMenuCheckboxItemComponent
>;
export type DropdownMenuRadioItemProps = ComponentProps<typeof DropdownMenuRadioItemComponent>;
export type DropdownMenuLabelProps = ComponentProps<typeof DropdownMenuLabelComponent>;
export type DropdownMenuSeparatorProps = ComponentProps<typeof DropdownMenuSeparatorComponent>;
export type DropdownMenuShortcutProps = ComponentProps<typeof DropdownMenuShortcutComponent>;
export type DropdownMenuSubTriggerProps = ComponentProps<typeof DropdownMenuSubTriggerComponent>;
export type DropdownMenuSubContentProps = ComponentProps<typeof DropdownMenuSubContentComponent>;
export type DropdownMenuGroupProps = DropdownMenuPrimitive.GroupProps;
export type DropdownMenuRadioGroupProps = DropdownMenuPrimitive.RadioGroupProps;
export type DropdownMenuCheckboxGroupProps = DropdownMenuPrimitive.CheckboxGroupProps;
export type DropdownMenuSubProps = DropdownMenuPrimitive.SubProps;

export {
  dropdownVariants,
  KUMO_DROPDOWN_CONTENT_CLASS,
  KUMO_DROPDOWN_DEFAULT_VARIANTS,
  KUMO_DROPDOWN_ITEM_CLASS,
  KUMO_DROPDOWN_VARIANTS,
  type KumoDropdownVariant,
  type KumoDropdownVariantsProps,
} from "./variants";
