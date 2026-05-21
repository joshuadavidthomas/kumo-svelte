<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";

  const items = [
    { id: "bug", value: "bug", label: "bug" },
    { id: "docs", value: "documentation", label: "documentation" },
    { id: "enhancement", value: "enhancement", label: "enhancement" },
    { id: "help-wanted", value: "help wanted", label: "help wanted" },
    { id: "good-first-issue", value: "good first issue", label: "good first issue" },
  ];

  let value = $state("");
  let open = $state(false);
</script>

<Combobox {items} bind:open {value} onValueChange={(next) => (value = String(next))}>
  <ComboboxTriggerInput placeholder="Select an issue..." />
  <ComboboxContent>
    <ComboboxList>
      {#each items as item (item.id)}
        <ComboboxItem value={item.value}>{item.value}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
