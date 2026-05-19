<script lang="ts">
  import { Checkbox } from "kumo-svelte";

  let checked = $state(false);
</script>

<Checkbox label="Accept terms and conditions" bind:checked />
