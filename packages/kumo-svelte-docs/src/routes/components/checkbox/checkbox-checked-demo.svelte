<script lang="ts">
  import { Checkbox } from "kumo-svelte";

  let checked = $state(true);
</script>

<Checkbox label="I agree" bind:checked />
