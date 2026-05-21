<script lang="ts">
  import {
    Button,
    Combobox,
    ComboboxChip,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxTriggerMultipleWithInput,
    Text,
  } from "kumo-svelte";
  import { bots } from "./combobox-data";

  let value = $state<string[]>([]);
  let open = $state(false);
  let botLabels = $derived(Object.fromEntries(bots.map((bot) => [bot.value, bot.label])));
</script>

{#snippet selectedBot(value: string)}
  <ComboboxChip {value}>{botLabels[value] ?? value}</ComboboxChip>
{/snippet}

<div class="flex gap-2">
  <Combobox multiple bind:value bind:open items={bots}>
    <ComboboxTriggerMultipleWithInput class="w-[400px]" placeholder="Select bots" renderItem={selectedBot} />
    <ComboboxContent class="max-h-[200px] min-w-auto overflow-y-auto">
      <ComboboxEmpty />
      <ComboboxList>
        {#each bots as bot}
          <ComboboxItem value={bot.value} label={bot.label}>
            <div class="flex gap-2">
              <Text>{bot.label}</Text>
              <Text variant="secondary">{bot.author}</Text>
            </div>
          </ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
  <Button variant="primary">Submit</Button>
</div>
