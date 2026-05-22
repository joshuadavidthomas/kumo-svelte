<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";
  const fruits = ["Apple", "Banana", "Cherry", "Grape", "Mango", "Orange"];
  const items = fruits.map((fruit) => ({ label: fruit, value: fruit }));
</script>

<Autocomplete.Root {items}>
  <Autocomplete.InputGroup placeholder="Search fruits…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#each fruits as fruit (fruit)}
        <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
      {/each}
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete.Root>
