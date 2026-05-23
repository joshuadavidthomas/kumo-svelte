<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { Empty } from "kumo-svelte/components/empty";
  import CloudSlashIcon from "phosphor-svelte/lib/CloudSlashIcon";
</script>

<Empty
  title="No connection"
  description="Unable to connect to the server. Please check your connection and try again."
>
  {#snippet icon()}
    <CloudSlashIcon size={48} class="text-kumo-inactive" />
  {/snippet}

  <div class="flex gap-2">
    <Button variant="primary">Retry</Button>
    <Button variant="secondary">Go Back</Button>
  </div>
</Empty>
