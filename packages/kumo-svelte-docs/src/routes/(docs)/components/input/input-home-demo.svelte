<script lang="ts">
  import { Input } from "kumo-svelte";
</script>

<div class="grid gap-3">
  <Input placeholder="Type something..." />
  <Input variant="error" value="Invalid!" />
</div>
