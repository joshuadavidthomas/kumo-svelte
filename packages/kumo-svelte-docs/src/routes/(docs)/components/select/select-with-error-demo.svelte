<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
</script>

<Select.Root
  label="Issue Type"
  error="Please select an issue type"
  class="w-[280px]"
  items={{ bug: "Bug", documentation: "Documentation", feature: "Feature" }}
/>
