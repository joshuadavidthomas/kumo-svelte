<script lang="ts">
  import * as Combobox from "kumo-svelte/components/combobox";
  import { fruits } from "./combobox-data";

  const sizeFruits = fruits.slice(0, 8);
  const items = sizeFruits.map((fruit) => ({ label: fruit, value: fruit }));
  let smValue = $state("");
  let baseValue = $state("");
</script>

<div class="flex flex-wrap items-center gap-4">
  <Combobox.Root bind:value={smValue} {items} size="sm">
    <Combobox.TriggerInput placeholder="Small (sm)" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#each sizeFruits as fruit}
          <Combobox.Item value={fruit}>{fruit}</Combobox.Item>
        {/each}
      </Combobox.List>
    </Combobox.Content>
  </Combobox.Root>

  <Combobox.Root bind:value={baseValue} {items} size="base">
    <Combobox.TriggerInput placeholder="Base (default)" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#each sizeFruits as fruit}
          <Combobox.Item value={fruit}>{fruit}</Combobox.Item>
        {/each}
      </Combobox.List>
    </Combobox.Content>
  </Combobox.Root>
</div>
