<script lang="ts">
  import { Label } from "kumo-svelte/components/label";
</script>

<div class="flex flex-col gap-2">
  <Label>Default Label</Label>
  <Label showOptional>Optional Field</Label>
  <Label tooltip={tooltip}>With Tooltip</Label>
  {#snippet tooltip()}More info{/snippet}
</div>
