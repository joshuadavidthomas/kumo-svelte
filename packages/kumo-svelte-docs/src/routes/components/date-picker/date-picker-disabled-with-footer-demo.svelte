<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { getLocalTimeZone } from "@internationalized/date";
  import { DatePicker } from "kumo-svelte";

  const timeZone = getLocalTimeZone();
  let date = $state<DateValue | undefined>();

  function isWeekend(value: DateValue) {
    const day = value.toDate(timeZone).getDay();
    return day === 0 || day === 6;
  }
</script>

<div class="flex flex-col gap-3">
  <DatePicker mode="single" bind:value={date} isDateUnavailable={isWeekend} />
  <p class="text-xs text-kumo-subtle">Weekend dates are unavailable. Pick a weekday for this schedule.</p>
</div>
