<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";

  const regions = ["WNAM", "ENAM", "WEUR", "EEUR", "APAC"];
  const items = regions.map((region) => ({ label: region, value: region }));
  let value = $state("");
  let open = $state(false);
</script>

<Combobox
  bind:value
  bind:open
  {items}
  label="Region"
  error="Choose a region before continuing."
  required
>
  <ComboboxTriggerInput placeholder="Select a region" />
  <ComboboxContent>
    <ComboboxList>
      {#each regions as region}
        <ComboboxItem value={region}>{region}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
