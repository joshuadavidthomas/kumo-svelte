<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { DeleteResource } from "kumo-svelte/blocks/delete-resource";
  let open = $state(false);
  let isDeleting = $state(false);

  async function handleDelete() {
    isDeleting = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isDeleting = false;
    open = false;
  }
</script>

<Button variant="destructive" onclick={() => (open = true)}>Delete Worker</Button>
<DeleteResource
  bind:open
  resourceType="Worker"
  resourceName="api-gateway-worker"
  onDelete={handleDelete}
  {isDeleting}
/>
