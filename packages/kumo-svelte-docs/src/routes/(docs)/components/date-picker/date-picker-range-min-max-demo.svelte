<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { DatePicker } from "kumo-svelte";

  type DateRangeValue = { start: DateValue | undefined; end: DateValue | undefined };

  let range = $state<DateRangeValue | undefined>();
</script>

{#snippet footer()}
  <span class="text-xs text-kumo-subtle">Select 3-7 nights</span>
{/snippet}

<DatePicker mode="range" bind:value={range} minDays={3} maxDays={7} {footer} />
