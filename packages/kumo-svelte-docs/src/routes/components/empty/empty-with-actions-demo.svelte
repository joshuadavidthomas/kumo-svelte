<script lang="ts">
  import { Button, Empty } from "kumo-svelte";
  import CloudSlashIcon from "phosphor-svelte/lib/CloudSlashIcon";
</script>

{#snippet cloudSlashIcon()}
  <CloudSlashIcon size={48} class="text-kumo-inactive" />
{/snippet}

{#snippet actions()}
  <div class="flex gap-2">
    <Button variant="primary">Retry</Button>
    <Button variant="secondary">Go Back</Button>
  </div>
{/snippet}

<Empty
  icon={cloudSlashIcon}
  title="No connection"
  description="Unable to connect to the server. Please check your connection and try again."
  contents={actions}
/>
