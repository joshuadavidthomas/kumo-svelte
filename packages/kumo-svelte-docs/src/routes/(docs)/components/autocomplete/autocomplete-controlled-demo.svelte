<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";
  import { fruits, fruitItems } from "./autocomplete-data";

  let value = $state("");
</script>

<div class="flex flex-col gap-3 w-80">
  <Autocomplete.Root items={fruitItems} bind:value>
    <Autocomplete.InputGroup placeholder="Type a fruit…" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each fruits as fruit (fruit)}
          <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
        {/each}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete.Root>
  {#if value}
    <p class="text-sm text-kumo-subtle">Value: <span class="font-medium text-kumo-default">{value}</span></p>
  {/if}
</div>
