<script lang="ts">
  import { Label } from "kumo-svelte/components/label";
</script>

{#snippet tooltip()}
  More information about this field
{/snippet}

<div class="flex flex-col gap-4">
  <Label>Default Label</Label>
  <Label showOptional>Optional Label</Label>
  <Label {tooltip}>Label with Tooltip</Label>
</div>
