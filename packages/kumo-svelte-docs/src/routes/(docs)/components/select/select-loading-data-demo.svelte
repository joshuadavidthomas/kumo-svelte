<script lang="ts">
  import { onMount } from "svelte";
  import * as Select from "kumo-svelte/components/select";
  let loading = $state(true);
  let value = $state("");
  let items = $state<Record<string, string> | undefined>();

  onMount(() => {
    const timer = setTimeout(() => {
      loading = false;
      items = Object.fromEntries(["Visal", "John", "Alice", "Michael", "Sok"].map((item) => [item, item]));
    }, 1200);

    return () => clearTimeout(timer);
  });
</script>

<Select.Root
  label="Assignee"
  class="w-[200px]"
  {loading}
  {value}
  onValueChange={(next) => (value = next as string)}
  placeholder="Select assignee"
  {items}
/>
