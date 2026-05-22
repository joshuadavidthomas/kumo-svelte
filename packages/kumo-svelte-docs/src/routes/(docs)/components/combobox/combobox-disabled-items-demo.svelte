<script lang="ts">
  import { Combobox, Text } from "kumo-svelte";
  import { disabledDatabases } from "./combobox-data";

  let value = $state("");
  let open = $state(false);
</script>

<div class="w-80">
<Combobox bind:value bind:open items={disabledDatabases}>
  <Combobox.TriggerInput placeholder="Select database" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#each disabledDatabases as item}
        <Combobox.Item value={item.value} disabled={item.disabled}>
          {item.label}
          {#if item.reason}
            <Text variant="secondary" size="xs" as="span"> — {item.reason}</Text>
          {/if}
        </Combobox.Item>
      {/each}
    </Combobox.List>
  </Combobox.Content>
</Combobox>
</div>
