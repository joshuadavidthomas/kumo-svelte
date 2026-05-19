<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";

  const fruits = ["Apple", "Apricot", "Avocado", "Banana", "Blackberry", "Blueberry", "Cherry", "Date"];
  const items = fruits.map((fruit) => ({ label: fruit, value: fruit }));
  let value = $state("Apple");
  let open = $state(false);
</script>

<Combobox
  {value}
  bind:open
  {items}
  onValueChange={(nextValue) => {
    value = nextValue as string;
  }}
>
  <ComboboxTriggerInput placeholder="Please select" />
  <ComboboxContent>
    <ComboboxList>
      {#each fruits as fruit}
        <ComboboxItem value={fruit}>{fruit}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
