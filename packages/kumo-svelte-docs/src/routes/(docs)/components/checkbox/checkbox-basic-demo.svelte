<script lang="ts">
  import { Checkbox } from "kumo-svelte/components/checkbox";
  let checked = $state(false);
</script>

<Checkbox label="Accept terms and conditions" bind:checked />
