<script lang="ts">
  import { Switch } from "kumo-svelte";

  let checked = $state(true);
</script>

<Switch bind:checked aria-label="Toggle setting" />
