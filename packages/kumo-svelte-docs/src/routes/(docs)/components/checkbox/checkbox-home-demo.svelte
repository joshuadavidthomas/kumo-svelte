<script lang="ts">
  import { Checkbox } from "kumo-svelte";

  let checked = $state(true);
</script>

<Checkbox label="Max bandwidth" {checked} onCheckedChange={(next) => (checked = Boolean(next))} />
