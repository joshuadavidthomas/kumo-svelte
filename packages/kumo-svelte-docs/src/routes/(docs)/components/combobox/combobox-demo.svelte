<script lang="ts">
  import { Combobox } from "kumo-svelte";
  import { fruits } from "./combobox-data";

  const items = fruits.map((fruit) => ({ label: fruit, value: fruit }));
  let value = $state("Apple");
  let open = $state(false);
</script>

<Combobox bind:value bind:open {items}>
  <Combobox.TriggerInput placeholder="Please select" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#each fruits as fruit}
        <Combobox.Item value={fruit}>{fruit}</Combobox.Item>
      {/each}
    </Combobox.List>
  </Combobox.Content>
</Combobox>
