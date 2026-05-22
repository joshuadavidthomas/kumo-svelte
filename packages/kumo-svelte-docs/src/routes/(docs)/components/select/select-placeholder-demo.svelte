<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
  let value = $state("");
</script>

<Select.Root
  label="Category"
  placeholder="Choose a category..."
  class="w-[200px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{ bug: "Bug", documentation: "Documentation", feature: "Feature" }}
/>
