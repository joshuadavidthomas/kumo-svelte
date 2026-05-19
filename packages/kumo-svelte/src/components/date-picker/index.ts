import type { ComponentProps } from "svelte";
import DatePickerComponent from "./date-picker.svelte";

export { default as DatePicker } from "./date-picker.svelte";
export { default } from "./date-picker.svelte";
export type DatePickerProps = ComponentProps<typeof DatePickerComponent>;
export type {
  DatePickerMode,
  DatePickerSnippetProps,
  DatePickerValue,
  WeekStartsOn,
} from "./types";
