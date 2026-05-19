<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTriggerInput, Text } from "kumo-svelte";

  const databases = ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite"];
  const items = databases.map((database) => ({ label: database, value: database }));
  let value = $state<string[]>(["PostgreSQL", "Redis"]);
  let open = $state(false);
</script>

<div class="space-y-2">
  <Combobox multiple bind:value bind:open {items}>
    <ComboboxTriggerInput placeholder="Select databases" />
    <ComboboxContent>
      <ComboboxList>
        {#each databases as database}
          <ComboboxItem value={database}>{database}</ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
  <Text variant="secondary" size="sm">Selected: {value.join(", ") || "None"}</Text>
</div>
