<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";

  const fruits = ["Apple", "Banana", "Cherry"];
  const items = fruits.map((fruit) => ({ label: fruit, value: fruit }));
  let open = $state(false);
</script>

<Combobox disabled value="Apple" bind:open {items}>
  <ComboboxTriggerInput placeholder="Disabled" />
  <ComboboxContent>
    <ComboboxList>
      {#each fruits as fruit}
        <ComboboxItem value={fruit}>{fruit}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
