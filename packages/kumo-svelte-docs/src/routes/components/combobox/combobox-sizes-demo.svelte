<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";

  const fruits = ["Apple", "Banana", "Cherry"];
  const items = fruits.map((fruit) => ({ label: fruit, value: fruit }));
  const sizes = ["xs", "sm", "base", "lg"] as const;
  let openBySize = $state<Record<string, boolean>>({});
</script>

<div class="grid gap-3 sm:grid-cols-2">
  {#each sizes as size}
    <Combobox
      {items}
      {size}
      value="Apple"
      open={openBySize[size] ?? false}
      onOpenChange={(open) => {
        openBySize[size] = open;
      }}
    >
      <ComboboxTriggerInput placeholder={`${size} combobox`} />
      <ComboboxContent>
        <ComboboxList>
          {#each fruits as fruit}
            <ComboboxItem value={fruit}>{fruit}</ComboboxItem>
          {/each}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  {/each}
</div>
