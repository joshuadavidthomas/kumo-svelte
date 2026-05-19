<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { DatePicker } from "kumo-svelte";

  type DateRangeValue = { start: DateValue | undefined; end: DateValue | undefined };

  let range = $state<DateRangeValue | undefined>();
</script>

<div class="flex flex-col gap-3">
  <DatePicker mode="range" bind:value={range} minDays={3} maxDays={7} />
  <span class="text-xs text-kumo-subtle">Select 3–7 days</span>
</div>
