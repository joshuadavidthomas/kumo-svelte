<script lang="ts">
  import * as Checkbox from "kumo-svelte/components/checkbox";
  let indeterminate = $state(true);
</script>

<Checkbox.Root label="Select all" bind:indeterminate />
