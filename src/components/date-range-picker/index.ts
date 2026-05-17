import type { ComponentProps } from "svelte";
import DateRangePickerComponent from "./date-range-picker.svelte";

export { default as DateRangePicker } from "./date-range-picker.svelte";
export { default } from "./date-range-picker.svelte";
export type DateRangePickerProps = ComponentProps<typeof DateRangePickerComponent>;
export {
  dateRangePickerVariants,
  KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS,
  KUMO_DATE_RANGE_PICKER_VARIANTS,
  type KumoDateRangePickerSize,
  type KumoDateRangePickerVariant,
  type KumoDateRangePickerVariantsProps,
} from "./variants";
