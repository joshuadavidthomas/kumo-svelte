<script lang="ts">
  import * as Checkbox from "kumo-svelte/components/checkbox";
  let checked = $state(false);
</script>

<Checkbox.Root label="Remember me" controlFirst={false} bind:checked />
