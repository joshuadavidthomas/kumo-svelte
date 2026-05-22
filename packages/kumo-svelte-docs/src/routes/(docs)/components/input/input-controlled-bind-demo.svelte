<script lang="ts">
  import { Input } from "kumo-svelte/components/input";
  let value = $state("");
</script>

<Input
  label="With bind:value"
  placeholder="Type something..."
  description={value ? `Value: ${value}` : "Uses Svelte two-way binding"}
  bind:value
/>
