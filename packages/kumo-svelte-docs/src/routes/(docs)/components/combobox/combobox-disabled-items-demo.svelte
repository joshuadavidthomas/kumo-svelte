<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxTriggerInput, Text } from "kumo-svelte";
  import { disabledDatabases } from "./combobox-data";

  let value = $state("");
  let open = $state(false);
</script>

<div class="w-80">
<Combobox bind:value bind:open items={disabledDatabases}>
  <ComboboxTriggerInput placeholder="Select database" />
  <ComboboxContent>
    <ComboboxEmpty />
    <ComboboxList>
      {#each disabledDatabases as item}
        <ComboboxItem value={item.value} disabled={item.disabled}>
          {item.label}
          {#if item.reason}
            <Text variant="secondary" size="xs" as="span"> — {item.reason}</Text>
          {/if}
        </ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
</div>
