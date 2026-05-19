<script lang="ts">
  import { Switch } from "kumo-svelte";
</script>

<div class="grid grid-cols-2 gap-x-8 gap-y-4">
  <Switch label="Default off" checked={false} />
  <Switch label="Default on" checked />
  <Switch label="Neutral off" variant="neutral" checked={false} />
  <Switch label="Neutral on" variant="neutral" checked />
</div>
