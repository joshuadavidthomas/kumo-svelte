<script lang="ts">
  import * as Checkbox from "kumo-svelte/components/checkbox";
  let checked = $state(true);
</script>

<Checkbox.Root label="Max bandwidth" {checked} onCheckedChange={(next) => (checked = Boolean(next))} />
