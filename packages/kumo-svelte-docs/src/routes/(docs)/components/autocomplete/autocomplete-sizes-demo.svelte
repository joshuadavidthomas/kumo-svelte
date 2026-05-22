<script lang="ts">
  import { Autocomplete } from "kumo-svelte";
  import { fruits, fruitItems } from "./autocomplete-data";
</script>

<div class="flex flex-wrap items-center gap-4">
  <Autocomplete items={fruitItems}>
    <Autocomplete.InputGroup size="xs" placeholder="xs" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each fruits as fruit (fruit)}
          <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
        {/each}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  <Autocomplete items={fruitItems}>
    <Autocomplete.InputGroup size="sm" placeholder="sm" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each fruits as fruit (fruit)}
          <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
        {/each}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  <Autocomplete items={fruitItems}>
    <Autocomplete.InputGroup size="base" placeholder="base (default)" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each fruits as fruit (fruit)}
          <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
        {/each}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  <Autocomplete items={fruitItems}>
    <Autocomplete.InputGroup size="lg" placeholder="lg" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each fruits as fruit (fruit)}
          <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
        {/each}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
</div>
