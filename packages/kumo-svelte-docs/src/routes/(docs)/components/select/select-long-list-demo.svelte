<script lang="ts">
  import { Select } from "kumo-svelte";

  const items = Array.from({ length: 50 }, (_, index) => ({
    value: `item-${index + 1}`,
    label: `Option ${index + 1}`,
  }));

  let value = $state("");
</script>

<Select
  label="Long List Select"
  description="Tests scrolling behavior with many options"
  placeholder="Choose an option..."
  class="w-[220px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  {items}
/>
