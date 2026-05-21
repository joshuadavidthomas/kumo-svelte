<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { getLocalTimeZone } from "@internationalized/date";
  import { DatePicker } from "kumo-svelte";

  let date = $state<DateValue | undefined>();

  function formatDate(value: DateValue | undefined) {
    return value ? value.toDate(getLocalTimeZone()).toLocaleDateString() : "None";
  }
</script>

<div class="flex flex-col gap-4">
  <DatePicker mode="single" bind:value={date} />
  <p class="text-sm text-kumo-subtle">Selected: {formatDate(date)}</p>
</div>
