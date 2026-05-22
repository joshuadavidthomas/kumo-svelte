<script lang="ts">
  import * as Checkbox from "kumo-svelte/components/checkbox";
  let checked = $state(false);
</script>

<Checkbox.Root label="Enable notifications" bind:checked />
