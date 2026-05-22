<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { getLocalTimeZone } from "@internationalized/date";
  import { DatePicker } from "kumo-svelte/components/date-picker";
  type DateRangeValue = { start: DateValue | undefined; end: DateValue | undefined };

  let range = $state<DateRangeValue | undefined>();

  function formatRange(value: DateRangeValue | undefined) {
    if (!value?.start) return "None";
    const start = value.start.toDate(getLocalTimeZone()).toLocaleDateString();
    const end = value.end?.toDate(getLocalTimeZone()).toLocaleDateString() ?? "…";
    return `${start} – ${end}`;
  }
</script>

<div class="flex flex-col gap-4">
  <DatePicker mode="range" bind:value={range} numberOfMonths={2} />
  <p class="text-sm text-kumo-subtle">Range: {formatRange(range)}</p>
</div>
