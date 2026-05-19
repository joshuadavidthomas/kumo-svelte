import type { ComponentProps } from "svelte";
import ComboboxComponent from "./combobox.svelte";
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

export { default as Combobox } from "./combobox.svelte";
export { default as ComboboxRoot } from "./combobox.svelte";
export { default as ComboboxContent } from "./combobox-content.svelte";
export { default as ComboboxEmpty } from "./combobox-empty.svelte";
export { default as ComboboxGroup } from "./combobox-group.svelte";
export { default as ComboboxGroupLabel } from "./combobox-group-label.svelte";
export { default as ComboboxInput } from "./combobox-input.svelte";
export { default as ComboboxItem } from "./combobox-item.svelte";
export { default as ComboboxList } from "./combobox-list.svelte";
export { default as ComboboxSeparator } from "./combobox-separator.svelte";
export { default as ComboboxTrigger } from "./combobox-trigger.svelte";
export { default as ComboboxTriggerInput } from "./combobox-trigger-input.svelte";
export { default as ComboboxTriggerValue } from "./combobox-trigger.svelte";

export type ComboboxProps = ComponentProps<typeof ComboboxComponent>;
export type ComboboxRootProps = ComboboxProps;
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
