<script lang="ts">
  import { Checkbox } from "kumo-svelte/components/checkbox";
  let indeterminate = $state(true);
</script>

<Checkbox label="Select all" bind:indeterminate />
