<script lang="ts">
  import { Checkbox } from "kumo-svelte";

  let checked = $state(false);
</script>

<Checkbox label="Enable notifications" bind:checked />
