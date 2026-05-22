<script lang="ts">
  import * as Switch from "kumo-svelte/components/switch";
</script>

<div class="flex flex-col gap-4">
  <Switch.Root label="Neutral off" variant="neutral" checked={false} />
  <Switch.Root label="Neutral on" variant="neutral" checked />
  <Switch.Root label="Neutral disabled" variant="neutral" checked={false} disabled />
</div>
