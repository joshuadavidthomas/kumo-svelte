<script lang="ts">
  import { getLocalTimeZone, type DateValue } from "@internationalized/date";
  import { Calendar as CalendarPrimitive, RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
  import type { DateRange, Month } from "bits-ui";
  import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
  import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
  import { cn } from "../../utils/cn";
  import type { DatePickerProps, DatePickerValue } from "./types";

  let {
    calendarLabel,
    children: customChildren,
    class: className,
    disableDaysOutsideMonth = false,
    disabled = false,
    excludeDisabled = false,
    fixedWeeks = false,
    footer,
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
    numberOfMonths = 1,
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

  const localTimeZone = getLocalTimeZone();

  let calendarType: "single" | "multiple" = $derived(mode === "multiple" ? "multiple" : "single");
  let calendarRootClass = $derived(cn("rdp-root select-none rounded-xl bg-kumo-base", className));

  function handleValueChange(nextValue: DatePickerValue) {
    onValueChange?.(nextValue);
  }

  function formatMonthHeading(value: DateValue) {
    const date = value.toDate(localTimeZone);
    const month =
      typeof monthFormat === "function"
        ? monthFormat(value.month)
        : new Intl.DateTimeFormat(locale, { month: monthFormat ?? "long" }).format(date);
    const year =
      typeof yearFormat === "function"
        ? yearFormat(value.year)
        : new Intl.DateTimeFormat(locale, { year: yearFormat ?? "numeric" }).format(date);

    return `${month} ${year}`;
  }
</script>

{#snippet DefaultCalendar({ months, weekdays }: { months: Month<DateValue>[]; weekdays: string[] })}
  <CalendarPrimitive.Header data-slot="date-picker-nav" class="rdp-nav">
    <CalendarPrimitive.PrevButton data-slot="date-picker-prev-button" aria-label="Previous month" class="rdp-button_previous">
      <CaretLeftIcon aria-hidden="true" class="rdp-chevron" size={16} />
    </CalendarPrimitive.PrevButton>
    <CalendarPrimitive.NextButton data-slot="date-picker-next-button" aria-label="Next month" class="rdp-button_next">
      <CaretRightIcon aria-hidden="true" class="rdp-chevron" size={16} />
    </CalendarPrimitive.NextButton>
  </CalendarPrimitive.Header>

  <div data-slot="date-picker-months" class="rdp-months">
    {#each months as month (month.value.toString())}
      <div data-slot="date-picker-month" class="rdp-month">
        <div data-slot="date-picker-header" class="rdp-month_caption">
          <span data-slot="date-picker-heading" class="rdp-caption_label">{formatMonthHeading(month.value)}</span>
        </div>
        <CalendarPrimitive.Grid data-slot="date-picker-grid" class="rdp-month_grid">
          <CalendarPrimitive.GridHead data-slot="date-picker-grid-head">
            <CalendarPrimitive.GridRow data-slot="date-picker-grid-row" class="rdp-weekdays">
              {#each weekdays as day, index (index)}
                <CalendarPrimitive.HeadCell data-slot="date-picker-head-cell" class="rdp-weekday">
                  {day.slice(0, 2)}
                </CalendarPrimitive.HeadCell>
              {/each}
            </CalendarPrimitive.GridRow>
          </CalendarPrimitive.GridHead>
          <CalendarPrimitive.GridBody data-slot="date-picker-grid-body" class="rdp-weeks">
            {#each month.weeks as weekDates, weekIndex (weekIndex)}
              <CalendarPrimitive.GridRow data-slot="date-picker-grid-row" class="rdp-week">
                {#each weekDates as date (date.toString())}
                  <CalendarPrimitive.Cell data-slot="date-picker-cell" {date} month={month.value} class="rdp-day">
                    <CalendarPrimitive.Day data-slot="date-picker-day" class="rdp-day_button">
                      {date.day}
                    </CalendarPrimitive.Day>
                  </CalendarPrimitive.Cell>
                {/each}
              </CalendarPrimitive.GridRow>
            {/each}
          </CalendarPrimitive.GridBody>
        </CalendarPrimitive.Grid>
      </div>
    {/each}
  </div>
{/snippet}

{#snippet DefaultRangeCalendar({ months, weekdays }: { months: Month<DateValue>[]; weekdays: string[] })}
  <RangeCalendarPrimitive.Header data-slot="date-picker-nav" class="rdp-nav">
    <RangeCalendarPrimitive.PrevButton data-slot="date-picker-prev-button" aria-label="Previous month" class="rdp-button_previous">
      <CaretLeftIcon aria-hidden="true" class="rdp-chevron" size={16} />
    </RangeCalendarPrimitive.PrevButton>
    <RangeCalendarPrimitive.NextButton data-slot="date-picker-next-button" aria-label="Next month" class="rdp-button_next">
      <CaretRightIcon aria-hidden="true" class="rdp-chevron" size={16} />
    </RangeCalendarPrimitive.NextButton>
  </RangeCalendarPrimitive.Header>

  <div data-slot="date-picker-months" class="rdp-months">
    {#each months as month (month.value.toString())}
      <div data-slot="date-picker-month" class="rdp-month">
        <div data-slot="date-picker-header" class="rdp-month_caption">
          <span data-slot="date-picker-heading" class="rdp-caption_label">{formatMonthHeading(month.value)}</span>
        </div>
        <RangeCalendarPrimitive.Grid data-slot="date-picker-grid" class="rdp-month_grid">
          <RangeCalendarPrimitive.GridHead data-slot="date-picker-grid-head">
            <RangeCalendarPrimitive.GridRow data-slot="date-picker-grid-row" class="rdp-weekdays">
              {#each weekdays as day, index (index)}
                <RangeCalendarPrimitive.HeadCell data-slot="date-picker-head-cell" class="rdp-weekday">
                  {day.slice(0, 2)}
                </RangeCalendarPrimitive.HeadCell>
              {/each}
            </RangeCalendarPrimitive.GridRow>
          </RangeCalendarPrimitive.GridHead>
          <RangeCalendarPrimitive.GridBody data-slot="date-picker-grid-body" class="rdp-weeks">
            {#each month.weeks as weekDates, weekIndex (weekIndex)}
              <RangeCalendarPrimitive.GridRow data-slot="date-picker-grid-row" class="rdp-week">
                {#each weekDates as date (date.toString())}
                  <RangeCalendarPrimitive.Cell data-slot="date-picker-cell" {date} month={month.value} class="rdp-day">
                    <RangeCalendarPrimitive.Day data-slot="date-picker-day" class="rdp-day_button">
                      {date.day}
                    </RangeCalendarPrimitive.Day>
                  </RangeCalendarPrimitive.Cell>
                {/each}
              </RangeCalendarPrimitive.GridRow>
            {/each}
          </RangeCalendarPrimitive.GridBody>
        </RangeCalendarPrimitive.Grid>
      </div>
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
      {#if footer}
        <div data-slot="date-picker-footer" class="rdp-footer">
          {@render footer()}
        </div>
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
      {#if footer}
        <div data-slot="date-picker-footer" class="rdp-footer">
          {@render footer()}
        </div>
      {/if}
    {/snippet}
  </CalendarPrimitive.Root>
{/if}
