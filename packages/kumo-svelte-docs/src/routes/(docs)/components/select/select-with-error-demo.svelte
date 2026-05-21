<script lang="ts">
  import { Select } from "kumo-svelte";
</script>

<Select
  label="Issue Type"
  error="Please select an issue type"
  class="w-[280px]"
  items={{ bug: "Bug", documentation: "Documentation", feature: "Feature" }}
/>
