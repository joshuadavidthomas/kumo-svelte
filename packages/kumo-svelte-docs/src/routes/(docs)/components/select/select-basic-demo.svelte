<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
  let value = $state("apple");
</script>

<Select.Root
  label="Favorite Fruit"
  class="w-[200px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
/>
