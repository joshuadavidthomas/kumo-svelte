<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import { getLocalTimeZone } from "@internationalized/date";
  import { Button } from "kumo-svelte/components/button";
  import { DatePicker } from "kumo-svelte/components/date-picker";
  import * as Popover from "kumo-svelte/components/popover";
  import CalendarDotsIcon from "phosphor-svelte/lib/CalendarDotsIcon";

  let date = $state<DateValue | undefined>();
  function formatDate(value: DateValue | undefined) {
    return value ? value.toDate(getLocalTimeZone()).toLocaleDateString() : "Pick a date";
  }
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline" icon={CalendarDotsIcon}>{formatDate(date)}</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="p-3">
    <DatePicker mode="single" bind:value={date} />
  </Popover.Content>
</Popover.Root>
