<script lang="ts">
  import { Input } from "kumo-svelte/components/input";
</script>

<div class="flex flex-col gap-4">
  <Input aria-label="Hostname" placeholder="example.com" value="not a host" error="Please enter a valid hostname" />
  <Input aria-label="Path" placeholder="/api/v1/users" value="missing-slash" error="Path must start with /" />
</div>
