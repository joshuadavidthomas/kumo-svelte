<script lang="ts">
  import { Select } from "kumo-svelte";

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
  <Select.Group>
    <Select.GroupLabel>Fruits</Select.GroupLabel>
    {#each foods.fruits as food (food.value)}
      <Select.Option value={food.value}>{food.label}</Select.Option>
    {/each}
  </Select.Group>
  <Select.Separator />
  <Select.Group>
    <Select.GroupLabel>Vegetables</Select.GroupLabel>
    {#each foods.vegetables as food (food.value)}
      <Select.Option value={food.value}>{food.label}</Select.Option>
    {/each}
  </Select.Group>
</Select>
