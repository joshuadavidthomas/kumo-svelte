<script lang="ts">
  import { getLocalTimeZone, type DateValue } from "@internationalized/date";
  import type { DateRange } from "bits-ui";
  import GlobeHemisphereWestIcon from "phosphor-svelte/lib/GlobeHemisphereWestIcon";
  import DatePicker from "../date-picker/date-picker.svelte";
  import type { DatePickerProps, DatePickerValue } from "../date-picker/types";
  import { cn } from "../../utils";
  import {
    dateRangePickerVariants,
    KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS,
    type KumoDateRangePickerSize,
    type KumoDateRangePickerVariant,
  } from "./variants";

  export interface DateRangePickerProps
    extends Omit<DatePickerProps, "class" | "mode" | "onValueChange" | "value"> {
    class?: string;
    onEndDateChange?: (date: Date | null) => void;
    onStartDateChange?: (date: Date | null) => void;
    onValueChange?: (value: DateRange) => void;
    size?: KumoDateRangePickerSize;
    timezone?: string;
    value?: DateRange;
    variant?: KumoDateRangePickerVariant;
  }

  let {
    class: className,
    onEndDateChange,
    onStartDateChange,
    onValueChange,
    size = KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS.size,
    timezone = "New York, NY, USA (GMT-4)",
    value = $bindable({ start: undefined, end: undefined }),
    variant = KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS.variant,
    ...datePickerProps
  }: DateRangePickerProps = $props();

  function toDate(value: DateValue | undefined) {
    return value ? value.toDate(getLocalTimeZone()) : null;
  }

  function handleValueChange(nextValue: DatePickerValue) {
    const nextRange = nextValue as DateRange;
    onValueChange?.(nextRange);
    onStartDateChange?.(toDate(nextRange.start));
    onEndDateChange?.(toDate(nextRange.end));
  }
</script>

<div
  data-slot="date-range-picker"
  class={cn(dateRangePickerVariants({ size, variant }), className)}
>
  <DatePicker
    {...datePickerProps}
    mode="range"
    bind:value
    class="bg-transparent p-0 outline-none"
    onValueChange={handleValueChange}
  />
  {#if timezone}
    <div class="flex items-center gap-1.5 text-xs text-kumo-subtle">
      <GlobeHemisphereWestIcon aria-hidden="true" size={14} />
      <span>{timezone}</span>
    </div>
  {/if}
</div>
