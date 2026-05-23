<script lang="ts">
  import { Checkbox } from "kumo-svelte/components/checkbox";
  let checked = $state(false);
</script>

<Checkbox label="Remember me" controlFirst={false} bind:checked />
