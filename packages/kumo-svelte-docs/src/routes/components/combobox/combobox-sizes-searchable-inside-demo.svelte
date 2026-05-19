<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTriggerValue } from "kumo-svelte";

  const items = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];
  const sizes = ["xs", "sm", "base", "lg"] as const;
  let openBySize = $state<Record<string, boolean>>({});
</script>

<div class="grid gap-3 sm:grid-cols-2">
  {#each sizes as size}
    <Combobox
      {items}
      {size}
      value="medium"
      open={openBySize[size] ?? false}
      onOpenChange={(open) => {
        openBySize[size] = open;
      }}
    >
      <ComboboxTriggerValue class="w-[200px]">{size} trigger</ComboboxTriggerValue>
      <ComboboxContent>
        <ComboboxInput placeholder="Search sizes" />
        <ComboboxList>
          {#each items as item}
            <ComboboxItem value={item.value}>{item.label}</ComboboxItem>
          {/each}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  {/each}
</div>
