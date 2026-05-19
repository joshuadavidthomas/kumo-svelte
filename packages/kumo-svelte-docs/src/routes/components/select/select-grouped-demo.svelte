<script lang="ts">
  import { Select, SelectGroup, SelectGroupLabel, SelectOption, SelectSeparator } from "kumo-svelte";

  const foods = {
    fruits: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
    ],
    vegetables: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach" },
    ],
  };

  let value = $state("");
</script>

<Select
  label="Food"
  placeholder="Pick a food..."
  class="w-[220px]"
  {value}
  onValueChange={(next) => (value = next as string)}
>
  <SelectGroup>
    <SelectGroupLabel>Fruits</SelectGroupLabel>
    {#each foods.fruits as food (food.value)}
      <SelectOption value={food.value}>{food.label}</SelectOption>
    {/each}
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>
    <SelectGroupLabel>Vegetables</SelectGroupLabel>
    {#each foods.vegetables as food (food.value)}
      <SelectOption value={food.value}>{food.label}</SelectOption>
    {/each}
  </SelectGroup>
</Select>
