<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
  let value = $state("apple");
</script>

<Select.Root
  aria-label="Select a fruit"
  class="w-[200px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
/>
