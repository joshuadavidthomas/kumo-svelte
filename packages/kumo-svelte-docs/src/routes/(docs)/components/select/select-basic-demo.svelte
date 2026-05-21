<script lang="ts">
  import { Select } from "kumo-svelte";

  let value = $state("apple");
</script>

<Select
  label="Favorite Fruit"
  class="w-[200px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
/>
