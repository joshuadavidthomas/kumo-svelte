<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { getLocalTimeZone } from "@internationalized/date";
  import { Button, DatePicker, Popover, PopoverContent, PopoverTrigger } from "kumo-svelte";
  import CalendarDotsIcon from "phosphor-svelte/lib/CalendarDotsIcon";

  let date = $state<DateValue | undefined>();
  function formatDate(value: DateValue | undefined) {
    return value ? value.toDate(getLocalTimeZone()).toLocaleDateString() : "Pick a date";
  }
</script>

<Popover>
  <PopoverTrigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline" icon={CalendarDotsIcon}>{formatDate(date)}</Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverContent class="p-3">
    <DatePicker mode="single" bind:value={date} />
  </PopoverContent>
</Popover>
