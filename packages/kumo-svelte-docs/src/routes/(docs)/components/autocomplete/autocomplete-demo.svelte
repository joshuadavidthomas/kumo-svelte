<script lang="ts">
  import { Autocomplete } from "kumo-svelte";
  import { fruits, fruitItems } from "./autocomplete-data";
</script>

<Autocomplete items={fruitItems}>
  <Autocomplete.InputGroup placeholder="Search fruits…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#each fruits as fruit (fruit)}
        <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
      {/each}
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete>
