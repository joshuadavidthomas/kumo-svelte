<script lang="ts">
  import { InputArea } from "kumo-svelte/components/input";
</script>

{#snippet label()}
  <span>Notes for <strong>review</strong></span>
{/snippet}

<InputArea label={label} required placeholder="Add notes for the reviewer..." rows={3} />
