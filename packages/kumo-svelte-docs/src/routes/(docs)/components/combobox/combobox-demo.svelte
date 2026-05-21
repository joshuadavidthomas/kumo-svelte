<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";
  import { fruits } from "./combobox-data";

  const items = fruits.map((fruit) => ({ label: fruit, value: fruit }));
  let value = $state("Apple");
  let open = $state(false);
</script>

<Combobox bind:value bind:open {items}>
  <ComboboxTriggerInput placeholder="Please select" />
  <ComboboxContent>
    <ComboboxEmpty />
    <ComboboxList>
      {#each fruits as fruit}
        <ComboboxItem value={fruit}>{fruit}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
