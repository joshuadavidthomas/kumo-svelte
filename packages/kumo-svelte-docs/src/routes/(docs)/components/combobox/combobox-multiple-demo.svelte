<script lang="ts">
  import { Button, Text } from "kumo-svelte";
  import * as Combobox from "kumo-svelte/components/combobox";
  import { bots } from "./combobox-data";

  let value = $state<string[]>([]);
  let open = $state(false);
  let botLabels = $derived(Object.fromEntries(bots.map((bot) => [bot.value, bot.label])));
</script>

{#snippet selectedBot(value: string)}
  <Combobox.Chip {value}>{botLabels[value] ?? value}</Combobox.Chip>
{/snippet}

<div class="flex gap-2">
  <Combobox.Root multiple bind:value bind:open items={bots}>
    <Combobox.TriggerMultipleWithInput class="w-[400px]" placeholder="Select bots" renderItem={selectedBot} />
    <Combobox.Content class="max-h-[200px] min-w-auto overflow-y-auto">
      <Combobox.Empty />
      <Combobox.List>
        {#each bots as bot}
          <Combobox.Item value={bot.value} label={bot.label}>
            <div class="flex gap-2">
              <Text>{bot.label}</Text>
              <Text variant="secondary">{bot.author}</Text>
            </div>
          </Combobox.Item>
        {/each}
      </Combobox.List>
    </Combobox.Content>
  </Combobox.Root>
  <Button variant="primary">Submit</Button>
</div>
