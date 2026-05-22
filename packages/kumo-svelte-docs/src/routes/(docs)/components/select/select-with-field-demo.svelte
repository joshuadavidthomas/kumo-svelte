<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
  let value = $state("");
</script>

<Select.Root
  label="Issue Type"
  description="Choose the category that best describes your issue"
  class="w-[280px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{ bug: "Bug", documentation: "Documentation", feature: "Feature" }}
/>
