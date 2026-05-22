import type { ComponentProps } from "svelte";
import DropdownMenuCheckboxGroupComponent from "./dropdown-checkbox-group.svelte";
import DropdownMenuCheckboxItemComponent from "./dropdown-checkbox-item.svelte";
import DropdownMenuContentComponent from "./dropdown-content.svelte";
import DropdownMenuGroupComponent from "./dropdown-group.svelte";
import DropdownMenuItemComponent from "./dropdown-item.svelte";
import DropdownMenuLabelComponent from "./dropdown-label.svelte";
import DropdownMenuLinkItemComponent from "./dropdown-link-item.svelte";
import DropdownMenuPortalComponent from "./dropdown-portal.svelte";
import DropdownMenuRadioGroupComponent from "./dropdown-radio-group.svelte";
import DropdownMenuRadioItemComponent from "./dropdown-radio-item.svelte";
import DropdownMenuRootComponent from "./dropdown-root.svelte";
import DropdownMenuSeparatorComponent from "./dropdown-separator.svelte";
import DropdownMenuShortcutComponent from "./dropdown-shortcut.svelte";
import DropdownMenuSubComponent from "./dropdown-sub.svelte";
import DropdownMenuSubContentComponent from "./dropdown-sub-content.svelte";
import DropdownMenuSubTriggerComponent from "./dropdown-sub-trigger.svelte";
import DropdownMenuTriggerComponent from "./dropdown-trigger.svelte";

const DropdownMenu = Object.assign(DropdownMenuRootComponent, {
  Root: DropdownMenuRootComponent,
  Trigger: DropdownMenuTriggerComponent,
  Portal: DropdownMenuPortalComponent,
  Content: DropdownMenuContentComponent,
  Item: DropdownMenuItemComponent,
  LinkItem: DropdownMenuLinkItemComponent,
  CheckboxItem: DropdownMenuCheckboxItemComponent,
  RadioItem: DropdownMenuRadioItemComponent,
  Label: DropdownMenuLabelComponent,
  Separator: DropdownMenuSeparatorComponent,
  Shortcut: DropdownMenuShortcutComponent,
  Group: DropdownMenuGroupComponent,
  RadioGroup: DropdownMenuRadioGroupComponent,
  CheckboxGroup: DropdownMenuCheckboxGroupComponent,
  Sub: DropdownMenuSubComponent,
  SubTrigger: DropdownMenuSubTriggerComponent,
  SubContent: DropdownMenuSubContentComponent,
});

export {
  DropdownMenu,
  DropdownMenuRootComponent as DropdownMenuRoot,
  DropdownMenuRootComponent as Root,
  DropdownMenuTriggerComponent as DropdownMenuTrigger,
  DropdownMenuTriggerComponent as Trigger,
  DropdownMenuPortalComponent as DropdownMenuPortal,
  DropdownMenuPortalComponent as Portal,
  DropdownMenuContentComponent as DropdownMenuContent,
  DropdownMenuContentComponent as Content,
  DropdownMenuItemComponent as DropdownMenuItem,
  DropdownMenuItemComponent as Item,
  DropdownMenuLinkItemComponent as DropdownMenuLinkItem,
  DropdownMenuLinkItemComponent as LinkItem,
  DropdownMenuCheckboxItemComponent as DropdownMenuCheckboxItem,
  DropdownMenuCheckboxItemComponent as CheckboxItem,
  DropdownMenuRadioItemComponent as DropdownMenuRadioItem,
  DropdownMenuRadioItemComponent as RadioItem,
  DropdownMenuLabelComponent as DropdownMenuLabel,
  DropdownMenuLabelComponent as Label,
  DropdownMenuSeparatorComponent as DropdownMenuSeparator,
  DropdownMenuSeparatorComponent as Separator,
  DropdownMenuShortcutComponent as DropdownMenuShortcut,
  DropdownMenuShortcutComponent as Shortcut,
  DropdownMenuGroupComponent as DropdownMenuGroup,
  DropdownMenuGroupComponent as Group,
  DropdownMenuRadioGroupComponent as DropdownMenuRadioGroup,
  DropdownMenuRadioGroupComponent as RadioGroup,
  DropdownMenuCheckboxGroupComponent as DropdownMenuCheckboxGroup,
  DropdownMenuCheckboxGroupComponent as CheckboxGroup,
  DropdownMenuSubComponent as DropdownMenuSub,
  DropdownMenuSubComponent as Sub,
  DropdownMenuSubTriggerComponent as DropdownMenuSubTrigger,
  DropdownMenuSubTriggerComponent as SubTrigger,
  DropdownMenuSubContentComponent as DropdownMenuSubContent,
  DropdownMenuSubContentComponent as SubContent,
};

export type DropdownMenuProps = ComponentProps<typeof DropdownMenuRootComponent>;
export type DropdownMenuRootProps = DropdownMenuProps;
export type DropdownMenuTriggerProps = ComponentProps<typeof DropdownMenuTriggerComponent>;
export type DropdownMenuPortalProps = ComponentProps<typeof DropdownMenuPortalComponent>;
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
export type DropdownMenuGroupProps = ComponentProps<typeof DropdownMenuGroupComponent>;
export type DropdownMenuRadioGroupProps = ComponentProps<typeof DropdownMenuRadioGroupComponent>;
export type DropdownMenuCheckboxGroupProps = ComponentProps<
  typeof DropdownMenuCheckboxGroupComponent
>;
export type DropdownMenuSubProps = ComponentProps<typeof DropdownMenuSubComponent>;

export {
  dropdownVariants,
  KUMO_DROPDOWN_CONTENT_CLASS,
  KUMO_DROPDOWN_DEFAULT_VARIANTS,
  KUMO_DROPDOWN_ITEM_CLASS,
  KUMO_DROPDOWN_VARIANTS,
  type KumoDropdownVariant,
  type KumoDropdownVariantsProps,
} from "./variants";
