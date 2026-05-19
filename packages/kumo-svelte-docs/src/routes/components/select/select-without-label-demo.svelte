<script lang="ts">
  import { Select } from "kumo-svelte";

  let value = $state("apple");
</script>

<Select
  aria-label="Select a fruit"
  class="w-[200px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
/>
