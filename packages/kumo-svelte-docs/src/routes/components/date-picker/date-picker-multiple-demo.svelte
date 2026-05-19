<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { DatePicker } from "kumo-svelte";

  let dates = $state<DateValue[] | undefined>();
</script>

<div class="flex flex-col gap-4">
  <DatePicker mode="multiple" bind:value={dates} />
  <p class="text-sm text-kumo-subtle">Selected: {dates?.length ?? 0} date(s)</p>
</div>
