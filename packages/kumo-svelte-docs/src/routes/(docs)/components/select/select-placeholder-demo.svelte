<script lang="ts">
  import { Select } from "kumo-svelte";

  let value = $state("");
</script>

<Select
  label="Category"
  placeholder="Choose a category..."
  class="w-[200px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{ bug: "Bug", documentation: "Documentation", feature: "Feature" }}
/>
