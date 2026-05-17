<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { Calendar as CalendarPrimitive, RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
  import type { DateRange, Month } from "bits-ui";
  import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon.svelte";
  import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon.svelte";
  import { cn } from "../../utils/cn";
  import type { DatePickerProps, DatePickerValue } from "./types";

  let {
    calendarLabel,
    children: customChildren,
    class: className,
    disableDaysOutsideMonth = false,
    disabled = false,
    excludeDisabled = false,
    fixedWeeks = true,
    initialFocus,
    isDateDisabled,
    isDateUnavailable,
    locale,
    maxDays,
    maxValue,
    minDays,
    minValue,
    mode = "single",
    monthFormat,
    numberOfMonths = mode === "range" ? 2 : 1,
    onChange,
    onEndValueChange,
    onPlaceholderChange,
    onStartValueChange,
    onValueChange,
    pagedNavigation,
    placeholder = $bindable(),
    preventDeselect,
    readonly = false,
    ref = $bindable(null),
    value = $bindable(),
    weekStartsOn,
    weekdayFormat = "short",
    yearFormat,
  }: DatePickerProps = $props();

  let calendarType: "single" | "multiple" = $derived(
    mode === "multiple" ? "multiple" : "single",
  );
  let calendarRootClass = $derived(
    cn(
      "rdp-root select-none rounded-xl bg-kumo-base p-3 text-kumo-default",
      "outline outline-1 outline-kumo-fill",
      className,
    ),
  );

  function handleValueChange(nextValue: DatePickerValue) {
    onValueChange?.(nextValue);
    onChange?.(nextValue);
  }
</script>

{#snippet DefaultCalendar({ months, weekdays }: { months: Month<DateValue>[]; weekdays: string[] })}
  <CalendarPrimitive.Header class="flex items-center justify-between gap-2">
    <CalendarPrimitive.PrevButton
      aria-label="Previous month"
      class={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-kumo-subtle transition-colors",
        "hover:bg-kumo-hover hover:text-kumo-default active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand",
      )}
    >
      <CaretLeftIcon aria-hidden="true" size={16} />
    </CalendarPrimitive.PrevButton>
    <CalendarPrimitive.Heading class="text-sm font-medium text-kumo-default" />
    <CalendarPrimitive.NextButton
      aria-label="Next month"
      class={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-kumo-subtle transition-colors",
        "hover:bg-kumo-hover hover:text-kumo-default active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand",
      )}
    >
      <CaretRightIcon aria-hidden="true" size={16} />
    </CalendarPrimitive.NextButton>
  </CalendarPrimitive.Header>
  <div class="flex flex-col gap-4 pt-4 sm:flex-row">
    {#each months as month (month.value.toString())}
      <CalendarPrimitive.Grid class="w-full border-collapse select-none space-y-1">
        <CalendarPrimitive.GridHead>
          <CalendarPrimitive.GridRow class="mb-1 flex w-full justify-between">
            {#each weekdays as day, index (index)}
              <CalendarPrimitive.HeadCell class="w-9 text-center text-xs font-normal text-kumo-subtle">
                {day.slice(0, 2)}
              </CalendarPrimitive.HeadCell>
            {/each}
          </CalendarPrimitive.GridRow>
        </CalendarPrimitive.GridHead>
        <CalendarPrimitive.GridBody>
          {#each month.weeks as weekDates, weekIndex (weekIndex)}
            <CalendarPrimitive.GridRow class="flex w-full justify-between">
              {#each weekDates as date (date.toString())}
                <CalendarPrimitive.Cell {date} month={month.value} class="relative size-9 p-0 text-center text-sm">
                  <CalendarPrimitive.Day
                    class={cn(
                      "relative inline-flex size-9 items-center justify-center rounded-md border border-transparent",
                      "bg-transparent text-sm tabular-nums text-kumo-default outline-none transition-colors",
                      "hover:bg-kumo-hover focus-visible:ring-2 focus-visible:ring-kumo-brand",
                      "data-selected:bg-kumo-brand data-selected:text-white",
                      "data-today:after:absolute data-today:after:bottom-1 data-today:after:size-1 data-today:after:rounded-full data-today:after:bg-current",
                      "data-disabled:pointer-events-none data-disabled:text-kumo-placeholder",
                      "data-outside-month:pointer-events-none data-outside-month:text-kumo-placeholder",
                      "data-unavailable:line-through",
                    )}
                  >
                    {date.day}
                  </CalendarPrimitive.Day>
                </CalendarPrimitive.Cell>
              {/each}
            </CalendarPrimitive.GridRow>
          {/each}
        </CalendarPrimitive.GridBody>
      </CalendarPrimitive.Grid>
    {/each}
  </div>
{/snippet}

{#snippet DefaultRangeCalendar({ months, weekdays }: { months: Month<DateValue>[]; weekdays: string[] })}
  <RangeCalendarPrimitive.Header class="flex items-center justify-between gap-2">
    <RangeCalendarPrimitive.PrevButton
      aria-label="Previous month"
      class={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-kumo-subtle transition-colors",
        "hover:bg-kumo-hover hover:text-kumo-default active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand",
      )}
    >
      <CaretLeftIcon aria-hidden="true" size={16} />
    </RangeCalendarPrimitive.PrevButton>
    <RangeCalendarPrimitive.Heading class="text-sm font-medium text-kumo-default" />
    <RangeCalendarPrimitive.NextButton
      aria-label="Next month"
      class={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-kumo-subtle transition-colors",
        "hover:bg-kumo-hover hover:text-kumo-default active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand",
      )}
    >
      <CaretRightIcon aria-hidden="true" size={16} />
    </RangeCalendarPrimitive.NextButton>
  </RangeCalendarPrimitive.Header>
  <div class="flex flex-col gap-4 pt-4 sm:flex-row">
    {#each months as month (month.value.toString())}
      <RangeCalendarPrimitive.Grid class="w-full border-collapse select-none space-y-1">
        <RangeCalendarPrimitive.GridHead>
          <RangeCalendarPrimitive.GridRow class="mb-1 flex w-full justify-between">
            {#each weekdays as day, index (index)}
              <RangeCalendarPrimitive.HeadCell class="w-9 text-center text-xs font-normal text-kumo-subtle">
                {day.slice(0, 2)}
              </RangeCalendarPrimitive.HeadCell>
            {/each}
          </RangeCalendarPrimitive.GridRow>
        </RangeCalendarPrimitive.GridHead>
        <RangeCalendarPrimitive.GridBody>
          {#each month.weeks as weekDates, weekIndex (weekIndex)}
            <RangeCalendarPrimitive.GridRow class="flex w-full justify-between">
              {#each weekDates as date (date.toString())}
                <RangeCalendarPrimitive.Cell {date} month={month.value} class="relative size-9 p-0 text-center text-sm">
                  <RangeCalendarPrimitive.Day
                    class={cn(
                      "relative inline-flex size-9 items-center justify-center border border-transparent",
                      "bg-transparent text-sm tabular-nums text-kumo-default outline-none transition-colors",
                      "rounded-md hover:bg-kumo-hover focus-visible:ring-2 focus-visible:ring-kumo-brand",
                      "data-selected:bg-kumo-brand data-selected:text-white",
                      "data-range-middle:rounded-none data-range-middle:bg-kumo-brand/10 data-range-middle:text-kumo-default",
                      "data-range-start:rounded-l-md data-range-start:bg-kumo-brand data-range-start:text-white",
                      "data-range-end:rounded-r-md data-range-end:bg-kumo-brand data-range-end:text-white",
                      "data-today:after:absolute data-today:after:bottom-1 data-today:after:size-1 data-today:after:rounded-full data-today:after:bg-current",
                      "data-disabled:pointer-events-none data-disabled:text-kumo-placeholder",
                      "data-outside-month:pointer-events-none data-outside-month:text-kumo-placeholder",
                      "data-unavailable:line-through",
                    )}
                  >
                    {date.day}
                  </RangeCalendarPrimitive.Day>
                </RangeCalendarPrimitive.Cell>
              {/each}
            </RangeCalendarPrimitive.GridRow>
          {/each}
        </RangeCalendarPrimitive.GridBody>
      </RangeCalendarPrimitive.Grid>
    {/each}
  </div>
{/snippet}

{#if mode === "range"}
  <RangeCalendarPrimitive.Root
    bind:ref
    bind:placeholder
    bind:value={value as never}
    data-slot="date-picker"
    data-mode={mode}
    class={calendarRootClass}
    {calendarLabel}
    {disableDaysOutsideMonth}
    {disabled}
    {excludeDisabled}
    {fixedWeeks}
    {isDateDisabled}
    {isDateUnavailable}
    {locale}
    {maxDays}
    {maxValue}
    {minDays}
    {minValue}
    {monthFormat}
    {numberOfMonths}
    {onEndValueChange}
    {onPlaceholderChange}
    onValueChange={(nextValue: DateRange) => handleValueChange(nextValue)}
    {onStartValueChange}
    {pagedNavigation}
    {preventDeselect}
    {readonly}
    {weekStartsOn}
    {weekdayFormat}
    {yearFormat}
  >
    {#snippet children({ months, weekdays })}
      {#if customChildren}
        {@render customChildren({ mode, months, weekdays })}
      {:else}
        {@render DefaultRangeCalendar({ months, weekdays })}
      {/if}
    {/snippet}
  </RangeCalendarPrimitive.Root>
{:else}
  <CalendarPrimitive.Root
    bind:ref
    bind:placeholder
    bind:value={value as never}
    data-slot="date-picker"
    data-mode={mode}
    class={calendarRootClass}
    type={calendarType}
    {calendarLabel}
    {disableDaysOutsideMonth}
    {disabled}
    {fixedWeeks}
    {initialFocus}
    {isDateDisabled}
    {isDateUnavailable}
    {locale}
    {maxDays}
    {maxValue}
    {minValue}
    {monthFormat}
    {numberOfMonths}
    {onPlaceholderChange}
    onValueChange={(nextValue: DateValue | DateValue[] | undefined) => handleValueChange(nextValue)}
    {pagedNavigation}
    {preventDeselect}
    {readonly}
    {weekStartsOn}
    {weekdayFormat}
    {yearFormat}
  >
    {#snippet children({ months, weekdays })}
      {#if customChildren}
        {@render customChildren({ mode, months, weekdays })}
      {:else}
        {@render DefaultCalendar({ months, weekdays })}
      {/if}
    {/snippet}
  </CalendarPrimitive.Root>
{/if}
