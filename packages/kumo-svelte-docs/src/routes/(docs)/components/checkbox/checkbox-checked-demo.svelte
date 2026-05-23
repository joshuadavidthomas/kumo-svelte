<script lang="ts">
  import { Checkbox } from "kumo-svelte/components/checkbox";
  let checked = $state(true);
</script>

<Checkbox label="I agree" bind:checked />
