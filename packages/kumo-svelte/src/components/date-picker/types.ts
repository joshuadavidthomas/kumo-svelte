import type { DateValue } from "@internationalized/date";
import type { DateMatcher, DateRange, Month } from "bits-ui";
import type { Snippet } from "svelte";

export type DatePickerMode = "single" | "multiple" | "range";
export type DatePickerValue = DateValue | DateValue[] | DateRange | undefined;
export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface DatePickerSnippetProps {
  mode: DatePickerMode;
  months: Month<DateValue>[];
  weekdays: string[];
}

export interface DatePickerProps {
  calendarLabel?: string;
  children?: Snippet<[DatePickerSnippetProps]>;
  class?: string;
  disableDaysOutsideMonth?: boolean;
  disabled?: boolean;
  excludeDisabled?: boolean;
  fixedWeeks?: boolean;
  footer?: Snippet;
  initialFocus?: boolean;
  isDateDisabled?: DateMatcher;
  isDateUnavailable?: DateMatcher;
  locale?: string;
  maxDays?: number;
  maxValue?: DateValue;
  minDays?: number;
  minValue?: DateValue;
  mode?: DatePickerMode;
  monthFormat?: Intl.DateTimeFormatOptions["month"] | ((month: number) => string);
  numberOfMonths?: number;
  onEndValueChange?: (value: DateValue | undefined) => void;
  onPlaceholderChange?: (value: DateValue) => void;
  onStartValueChange?: (value: DateValue | undefined) => void;
  onValueChange?: (value: DatePickerValue) => void;
  pagedNavigation?: boolean;
  placeholder?: DateValue;
  preventDeselect?: boolean;
  readonly?: boolean;
  ref?: HTMLDivElement | null;
  value?: DatePickerValue;
  weekStartsOn?: WeekStartsOn;
  weekdayFormat?: Intl.DateTimeFormatOptions["weekday"];
  yearFormat?: Intl.DateTimeFormatOptions["year"] | ((year: number) => string);
}
