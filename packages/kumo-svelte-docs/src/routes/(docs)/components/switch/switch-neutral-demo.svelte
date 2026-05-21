<script lang="ts">
  import { Switch } from "kumo-svelte";

  let checked = $state(false);
</script>

<Switch label="Neutral switch" variant="neutral" bind:checked />
