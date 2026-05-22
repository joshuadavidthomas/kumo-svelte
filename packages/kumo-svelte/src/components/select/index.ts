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

export {
  SelectComponent as Select,
  SelectComponent as Root,
  SelectRootComponent as SelectRoot,
  SelectTriggerComponent as SelectTrigger,
  SelectTriggerComponent as Trigger,
  SelectValueComponent as SelectValue,
  SelectValueComponent as Value,
  SelectPortalComponent as SelectPortal,
  SelectPortalComponent as Portal,
  SelectContentComponent as SelectContent,
  SelectContentComponent as Content,
  SelectViewportComponent as SelectViewport,
  SelectViewportComponent as Viewport,
  SelectOptionComponent as SelectOption,
  SelectOptionComponent as SelectItem,
  SelectOptionComponent as Option,
  SelectOptionComponent as Item,
  SelectGroupComponent as SelectGroup,
  SelectGroupComponent as Group,
  SelectGroupHeadingComponent as SelectGroupHeading,
  SelectGroupHeadingComponent as SelectGroupLabel,
  SelectGroupHeadingComponent as GroupHeading,
  SelectGroupHeadingComponent as GroupLabel,
  SelectSeparatorComponent as SelectSeparator,
  SelectSeparatorComponent as Separator,
};

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
