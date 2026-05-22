<script lang="ts">
  import { Label } from "kumo-svelte/components/label";
</script>

{#snippet tooltip()}
  Important field
{/snippet}

<div class="flex flex-col gap-3">
  <Label>Default</Label>
  <Label showOptional>Optional</Label>
  <Label {tooltip}>With Tooltip</Label>
</div>
