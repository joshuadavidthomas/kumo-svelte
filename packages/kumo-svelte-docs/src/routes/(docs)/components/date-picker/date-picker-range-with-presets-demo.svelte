<script lang="ts">
  import type { CalendarDate, DateValue } from "@internationalized/date";
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Button, DatePicker, Popover } from "kumo-svelte";
  import CalendarDotsIcon from "phosphor-svelte/lib/CalendarDotsIcon";

  type DateRangeValue = { start: DateValue | undefined; end: DateValue | undefined };
  type PresetRange = { start: CalendarDate; end: CalendarDate };

  const timeZone = getLocalTimeZone();
  const now = today(timeZone);
  const presets: Array<{ label: string; range: PresetRange }> = [
    { label: "Today", range: { start: now, end: now } },
    { label: "Last 7 days", range: { start: now.subtract({ days: 6 }), end: now } },
    { label: "Last 30 days", range: { start: now.subtract({ days: 29 }), end: now } },
    { label: "Last 90 days", range: { start: now.subtract({ days: 89 }), end: now } },
    { label: "This month", range: { start: now.set({ day: 1 }), end: now } },
    {
      label: "Last month",
      range: {
        start: now.subtract({ months: 1 }).set({ day: 1 }),
        end: now.set({ day: 1 }).subtract({ days: 1 }),
      },
    },
  ];

  let range = $state<DateRangeValue | undefined>();
  let placeholder = $state(now);

  function formatRange(value: DateRangeValue | undefined) {
    if (!value?.start) return "Select dates";
    const start = value.start.toDate(timeZone).toLocaleDateString();
    const end = value.end?.toDate(timeZone).toLocaleDateString();
    return end ? `${start} – ${end}` : start;
  }

  function selectPreset(preset: { range: PresetRange }) {
    range = preset.range;
    placeholder = preset.range.start;
  }

  function isPresetActive(preset: { range: PresetRange }) {
    return range?.start?.compare(preset.range.start!) === 0 && range?.end?.compare(preset.range.end!) === 0;
  }
</script>

<Popover>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline" icon={CalendarDotsIcon}>{formatRange(range)}</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="p-0">
    <div class="flex">
      <div class="flex flex-col gap-1 border-r border-kumo-hairline p-2 text-sm">
        {#each presets as preset}
          <button
            type="button"
            onclick={() => selectPreset(preset)}
            class={[
              "whitespace-nowrap rounded-md px-3 py-1.5 text-left",
              isPresetActive(preset)
                ? "bg-kumo-bg-inverse text-kumo-text-inverse"
                : "text-kumo-subtle hover:bg-kumo-control",
            ]}
          >
            {preset.label}
          </button>
        {/each}
      </div>
      <div class="p-3">
        <DatePicker mode="range" bind:value={range} bind:placeholder numberOfMonths={2} />
      </div>
    </div>
  </Popover.Content>
</Popover>
