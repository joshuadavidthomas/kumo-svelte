<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { DatePicker } from "kumo-svelte/components/date-picker";
  const timeZone = getLocalTimeZone();
  const now = today(timeZone);
  const maxDays = 5;
  const unavailableDates = [
    now.set({ day: 5 }),
    now.set({ day: 12 }),
    now.set({ day: 18 }),
    now.set({ day: 25 }),
  ];

  let dates = $state<DateValue[] | undefined>();
  let selectedCount = $derived(dates?.length ?? 0);

  function isUnavailable(value: DateValue) {
    return unavailableDates.some((date) => date.compare(value) === 0);
  }
</script>

{#snippet footer()}
  <p class="w-full pt-2 text-xs text-kumo-subtle">
    {selectedCount}/{maxDays} days selected. Grayed dates are unavailable.
  </p>
{/snippet}

<DatePicker
  mode="multiple"
  bind:value={dates}
  maxDays={maxDays}
  isDateDisabled={isUnavailable}
  fixedWeeks
  {footer}
/>
