import type { ComponentProps } from "svelte";
import ComboboxComponent from "./combobox.svelte";
import ComboboxChipComponent from "./combobox-chip.svelte";
import ComboboxContentComponent from "./combobox-content.svelte";
import ComboboxEmptyComponent from "./combobox-empty.svelte";
import ComboboxGroupComponent from "./combobox-group.svelte";
import ComboboxGroupLabelComponent from "./combobox-group-label.svelte";
import ComboboxInputComponent from "./combobox-input.svelte";
import ComboboxItemComponent from "./combobox-item.svelte";
import ComboboxListComponent from "./combobox-list.svelte";
import ComboboxSeparatorComponent from "./combobox-separator.svelte";
import ComboboxTriggerComponent from "./combobox-trigger.svelte";
import ComboboxTriggerInputComponent from "./combobox-trigger-input.svelte";
import ComboboxTriggerMultipleWithInputComponent from "./combobox-trigger-multiple-with-input.svelte";

const Combobox = Object.assign(ComboboxComponent, {
  Root: ComboboxComponent,
  Chip: ComboboxChipComponent,
  Content: ComboboxContentComponent,
  Empty: ComboboxEmptyComponent,
  Group: ComboboxGroupComponent,
  GroupLabel: ComboboxGroupLabelComponent,
  Input: ComboboxInputComponent,
  Item: ComboboxItemComponent,
  List: ComboboxListComponent,
  Separator: ComboboxSeparatorComponent,
  Trigger: ComboboxTriggerComponent,
  TriggerInput: ComboboxTriggerInputComponent,
  TriggerMultipleWithInput: ComboboxTriggerMultipleWithInputComponent,
  TriggerValue: ComboboxTriggerComponent,
  Value: ComboboxTriggerComponent,
});

export {
  Combobox,
  ComboboxComponent as ComboboxRoot,
  ComboboxComponent as Root,
  ComboboxChipComponent as ComboboxChip,
  ComboboxChipComponent as Chip,
  ComboboxContentComponent as ComboboxContent,
  ComboboxContentComponent as Content,
  ComboboxEmptyComponent as ComboboxEmpty,
  ComboboxEmptyComponent as Empty,
  ComboboxGroupComponent as ComboboxGroup,
  ComboboxGroupComponent as Group,
  ComboboxGroupLabelComponent as ComboboxGroupLabel,
  ComboboxGroupLabelComponent as GroupLabel,
  ComboboxInputComponent as ComboboxInput,
  ComboboxInputComponent as Input,
  ComboboxItemComponent as ComboboxItem,
  ComboboxItemComponent as Item,
  ComboboxListComponent as ComboboxList,
  ComboboxListComponent as List,
  ComboboxSeparatorComponent as ComboboxSeparator,
  ComboboxSeparatorComponent as Separator,
  ComboboxTriggerComponent as ComboboxTrigger,
  ComboboxTriggerComponent as ComboboxTriggerValue,
  ComboboxTriggerComponent as Trigger,
  ComboboxTriggerComponent as TriggerValue,
  ComboboxTriggerComponent as Value,
  ComboboxTriggerInputComponent as ComboboxTriggerInput,
  ComboboxTriggerInputComponent as TriggerInput,
  ComboboxTriggerMultipleWithInputComponent as ComboboxTriggerMultipleWithInput,
  ComboboxTriggerMultipleWithInputComponent as TriggerMultipleWithInput,
};

export type ComboboxProps = ComponentProps<typeof ComboboxComponent>;
export type ComboboxRootProps = ComboboxProps;
export type ComboboxChipProps = ComponentProps<typeof ComboboxChipComponent>;
export type ComboboxContentProps = ComponentProps<typeof ComboboxContentComponent>;
export type ComboboxEmptyProps = ComponentProps<typeof ComboboxEmptyComponent>;
export type ComboboxGroupProps = ComponentProps<typeof ComboboxGroupComponent>;
export type ComboboxGroupLabelProps = ComponentProps<typeof ComboboxGroupLabelComponent>;
export type ComboboxInputProps = ComponentProps<typeof ComboboxInputComponent>;
export type ComboboxItemProps = ComponentProps<typeof ComboboxItemComponent>;
export type ComboboxListProps = ComponentProps<typeof ComboboxListComponent>;
export type ComboboxSeparatorProps = ComponentProps<typeof ComboboxSeparatorComponent>;
export type ComboboxTriggerProps = ComponentProps<typeof ComboboxTriggerComponent>;
export type ComboboxTriggerInputProps = ComponentProps<typeof ComboboxTriggerInputComponent>;
export type ComboboxTriggerMultipleWithInputProps = ComponentProps<
  typeof ComboboxTriggerMultipleWithInputComponent
>;
export type ComboboxTriggerValueProps = ComboboxTriggerProps;

export {
  comboboxVariants,
  KUMO_COMBOBOX_DEFAULT_VARIANTS,
  KUMO_COMBOBOX_VARIANTS,
  type ComboboxInputSide,
  type ComboboxSize,
  type KumoComboboxInputSide,
  type KumoComboboxSize,
  type KumoComboboxVariantsProps,
} from "./variants";
