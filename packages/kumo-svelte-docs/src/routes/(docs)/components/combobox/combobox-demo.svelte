<script lang="ts">
  import * as Combobox from "kumo-svelte/components/combobox";

  const fruits = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Mango", "Orange", "Pear"];

  let value = $state("Apple");
  let open = $state(false);
</script>

<Combobox.Root bind:value bind:open>
  <Combobox.TriggerInput placeholder="Please select" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#each fruits as fruit}
        <Combobox.Item value={fruit}>{fruit}</Combobox.Item>
      {/each}
    </Combobox.List>
  </Combobox.Content>
</Combobox.Root>
