<script lang="ts">
  import * as Switch from "kumo-svelte/components/switch";
  let checked = $state(true);
</script>

<Switch.Root bind:checked aria-label="Toggle setting" />
