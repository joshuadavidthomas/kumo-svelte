<script lang="ts">
  import * as Switch from "kumo-svelte/components/switch";
  let checked = $state(false);
</script>

<Switch.Root label="Switch" bind:checked />
