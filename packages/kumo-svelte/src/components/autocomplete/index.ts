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

export {
  AutocompleteComponent as Autocomplete,
  AutocompleteComponent as AutocompleteRoot,
  AutocompleteComponent as Root,
  AutocompleteContentComponent as AutocompleteContent,
  AutocompleteContentComponent as Content,
  AutocompleteEmptyComponent as AutocompleteEmpty,
  AutocompleteEmptyComponent as Empty,
  AutocompleteGroupComponent as AutocompleteGroup,
  AutocompleteGroupComponent as Group,
  AutocompleteGroupLabelComponent as AutocompleteGroupLabel,
  AutocompleteGroupLabelComponent as GroupLabel,
  AutocompleteInputComponent as AutocompleteInput,
  AutocompleteInputComponent as AutocompleteInputGroup,
  AutocompleteInputComponent as Input,
  AutocompleteInputComponent as InputGroup,
  AutocompleteItemComponent as AutocompleteItem,
  AutocompleteItemComponent as Item,
  AutocompleteListComponent as AutocompleteList,
  AutocompleteListComponent as List,
  AutocompleteSeparatorComponent as AutocompleteSeparator,
  AutocompleteSeparatorComponent as Separator,
};

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
