<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";

  const items = [
    { value: "postgres", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL", disabled: true },
    { value: "redis", label: "Redis" },
  ];
  let value = $state("postgres");
  let open = $state(false);
</script>

<Combobox bind:value bind:open {items}>
  <ComboboxTriggerInput placeholder="Select database" />
  <ComboboxContent>
    <ComboboxList>
      {#each items as item}
        <ComboboxItem value={item.value} disabled={item.disabled}>{item.label}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
