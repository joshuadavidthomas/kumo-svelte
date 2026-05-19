<script lang="ts">
  import { Switch } from "kumo-svelte";
</script>

<div class="flex flex-col gap-4">
  <Switch label="Small" size="sm" checked />
  <Switch label="Base (default)" size="base" checked />
  <Switch label="Large" size="lg" checked />
</div>
