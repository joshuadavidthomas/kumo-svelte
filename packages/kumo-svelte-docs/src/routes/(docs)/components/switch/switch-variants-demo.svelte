<script lang="ts">
  import * as Switch from "kumo-svelte/components/switch";
</script>

<div class="grid grid-cols-2 gap-x-8 gap-y-4">
  <Switch.Root label="Default off" checked={false} />
  <Switch.Root label="Default on" checked />
  <Switch.Root label="Neutral off" variant="neutral" checked={false} />
  <Switch.Root label="Neutral on" variant="neutral" checked />
</div>
