<script lang="ts">
  import { Select } from "kumo-svelte";

  let value = $state("");
</script>

{#snippet labelTooltip()}
  Higher priority issues are addressed first
{/snippet}

<Select
  label="Priority"
  {labelTooltip}
  placeholder="Select priority"
  class="w-[200px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{ low: "Low", medium: "Medium", high: "High", critical: "Critical" }}
/>
