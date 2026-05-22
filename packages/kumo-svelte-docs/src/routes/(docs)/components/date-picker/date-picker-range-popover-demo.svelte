<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { getLocalTimeZone } from "@internationalized/date";
  import { Button } from "kumo-svelte/components/button";
  import { DatePicker } from "kumo-svelte/components/date-picker";
  import * as Popover from "kumo-svelte/components/popover";
  import CalendarDotsIcon from "phosphor-svelte/lib/CalendarDotsIcon";

  type DateRangeValue = { start: DateValue | undefined; end: DateValue | undefined };

  let range = $state<DateRangeValue | undefined>();

  function formatRange(value: DateRangeValue | undefined) {
    if (!value?.start) return "Select dates";
    const start = value.start.toDate(getLocalTimeZone()).toLocaleDateString();
    const end = value.end?.toDate(getLocalTimeZone()).toLocaleDateString();
    return end ? `${start} – ${end}` : start;
  }
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline" icon={CalendarDotsIcon}>{formatRange(range)}</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="p-3">
    <DatePicker mode="range" bind:value={range} numberOfMonths={2} />
  </Popover.Content>
</Popover.Root>
