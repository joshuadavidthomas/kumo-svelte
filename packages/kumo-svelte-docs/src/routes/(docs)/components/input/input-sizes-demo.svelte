<script lang="ts">
  import { Input } from "kumo-svelte/components/input";
</script>

<div class="flex flex-col gap-4">
  <Input size="xs" label="Extra Small" placeholder="Extra small input" />
  <Input size="sm" label="Small" placeholder="Small input" />
  <Input label="Base" placeholder="Base input (default)" />
  <Input size="lg" label="Large" placeholder="Large input" />
</div>
