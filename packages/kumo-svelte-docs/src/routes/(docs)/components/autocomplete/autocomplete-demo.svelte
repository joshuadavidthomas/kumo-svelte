<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";
  import { fruits } from "./autocomplete-data";
</script>

<Autocomplete.Root>
  <Autocomplete.InputGroup placeholder="Search fruits…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#each fruits as fruit (fruit)}
        <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
      {/each}
      <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete.Root>
