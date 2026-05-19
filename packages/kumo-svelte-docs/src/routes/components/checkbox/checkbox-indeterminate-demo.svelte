<script lang="ts">
  import { Checkbox } from "kumo-svelte";

  let indeterminate = $state(true);
</script>

<Checkbox label="Select all" bind:indeterminate />
