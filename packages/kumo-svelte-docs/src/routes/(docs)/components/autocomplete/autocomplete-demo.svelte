<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";
  import { fruits, fruitItems } from "./autocomplete-data";
</script>

<Autocomplete.Root items={fruitItems}>
  <Autocomplete.InputGroup placeholder="Search fruits…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#each fruits as fruit (fruit)}
        <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
      {/each}
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete.Root>
