<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
  let value = $state("");
</script>

{#snippet labelTooltip()}
  Higher priority issues are addressed first
{/snippet}

<Select.Root
  label="Priority"
  {labelTooltip}
  placeholder="Select priority"
  class="w-[200px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{ low: "Low", medium: "Medium", high: "High", critical: "Critical" }}
/>
