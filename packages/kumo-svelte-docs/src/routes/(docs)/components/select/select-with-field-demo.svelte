<script lang="ts">
  import { Select } from "kumo-svelte";

  let value = $state("");
</script>

<Select
  label="Issue Type"
  description="Choose the category that best describes your issue"
  class="w-[280px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{ bug: "Bug", documentation: "Documentation", feature: "Feature" }}
/>
