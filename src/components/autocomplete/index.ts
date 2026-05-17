import type { ComponentProps } from "svelte";
import AutocompleteComponent from "./autocomplete.svelte";
import AutocompleteContentComponent from "./autocomplete-content.svelte";
import AutocompleteEmptyComponent from "./autocomplete-empty.svelte";
import AutocompleteGroupComponent from "./autocomplete-group.svelte";
import AutocompleteGroupLabelComponent from "./autocomplete-group-label.svelte";
import AutocompleteInputComponent from "./autocomplete-input.svelte";
import AutocompleteItemComponent from "./autocomplete-item.svelte";
import AutocompleteListComponent from "./autocomplete-list.svelte";
import AutocompleteSeparatorComponent from "./autocomplete-separator.svelte";

export { default as Autocomplete } from "./autocomplete.svelte";
export { default as AutocompleteRoot } from "./autocomplete.svelte";
export { default as AutocompleteContent } from "./autocomplete-content.svelte";
export { default as AutocompleteEmpty } from "./autocomplete-empty.svelte";
export { default as AutocompleteGroup } from "./autocomplete-group.svelte";
export { default as AutocompleteGroupLabel } from "./autocomplete-group-label.svelte";
export { default as AutocompleteInput } from "./autocomplete-input.svelte";
export { default as AutocompleteInputGroup } from "./autocomplete-input.svelte";
export { default as AutocompleteItem } from "./autocomplete-item.svelte";
export { default as AutocompleteList } from "./autocomplete-list.svelte";
export { default as AutocompleteSeparator } from "./autocomplete-separator.svelte";

export type AutocompleteProps = ComponentProps<typeof AutocompleteComponent>;
export type AutocompleteRootProps = AutocompleteProps;
export type AutocompleteContentProps = ComponentProps<typeof AutocompleteContentComponent>;
export type AutocompleteEmptyProps = ComponentProps<typeof AutocompleteEmptyComponent>;
export type AutocompleteGroupProps = ComponentProps<typeof AutocompleteGroupComponent>;
export type AutocompleteGroupLabelProps = ComponentProps<typeof AutocompleteGroupLabelComponent>;
export type AutocompleteInputProps = ComponentProps<typeof AutocompleteInputComponent>;
export type AutocompleteInputGroupProps = AutocompleteInputProps;
export type AutocompleteItemProps = ComponentProps<typeof AutocompleteItemComponent>;
export type AutocompleteListProps = ComponentProps<typeof AutocompleteListComponent>;
export type AutocompleteSeparatorProps = ComponentProps<typeof AutocompleteSeparatorComponent>;

export {
  autocompleteVariants,
  KUMO_AUTOCOMPLETE_DEFAULT_VARIANTS,
  KUMO_AUTOCOMPLETE_VARIANTS,
  type KumoAutocompleteSize,
  type KumoAutocompleteVariantsProps,
} from "./variants";
