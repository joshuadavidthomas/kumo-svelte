<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";
  import { fruits } from "./combobox-data";

  const sizeFruits = fruits.slice(0, 8);
  const items = sizeFruits.map((fruit) => ({ label: fruit, value: fruit }));
  let smValue = $state("");
  let baseValue = $state("");
</script>

<div class="flex flex-wrap items-center gap-4">
  <Combobox bind:value={smValue} {items} size="sm">
    <ComboboxTriggerInput placeholder="Small (sm)" />
    <ComboboxContent>
      <ComboboxEmpty />
      <ComboboxList>
        {#each sizeFruits as fruit}
          <ComboboxItem value={fruit}>{fruit}</ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>

  <Combobox bind:value={baseValue} {items} size="base">
    <ComboboxTriggerInput placeholder="Base (default)" />
    <ComboboxContent>
      <ComboboxEmpty />
      <ComboboxList>
        {#each sizeFruits as fruit}
          <ComboboxItem value={fruit}>{fruit}</ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>
