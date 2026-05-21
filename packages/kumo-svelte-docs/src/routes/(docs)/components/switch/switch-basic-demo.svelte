<script lang="ts">
  import { Switch } from "kumo-svelte";

  let checked = $state(false);
</script>

<Switch label="Switch" bind:checked />
