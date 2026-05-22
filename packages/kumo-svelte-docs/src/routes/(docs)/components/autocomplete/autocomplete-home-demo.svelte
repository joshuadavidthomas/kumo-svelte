<script lang="ts">
  import { Autocomplete } from "kumo-svelte";

  const fruits = ["Apple", "Banana", "Cherry", "Grape", "Mango", "Orange"];
  const items = fruits.map((fruit) => ({ label: fruit, value: fruit }));
</script>

<Autocomplete {items}>
  <Autocomplete.InputGroup placeholder="Search fruits…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#each fruits as fruit (fruit)}
        <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
      {/each}
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete>
