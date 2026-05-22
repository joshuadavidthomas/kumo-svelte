<script lang="ts">
  import * as Switch from "kumo-svelte/components/switch";
</script>

<div class="flex flex-col gap-4">
  <Switch.Root label="Small" size="sm" checked />
  <Switch.Root label="Base (default)" size="base" checked />
  <Switch.Root label="Large" size="lg" checked />
</div>
