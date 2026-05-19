<script lang="ts">
  import { Button, DeleteResource } from "kumo-svelte";

  let open = $state(false);
  let isDeleting = $state(false);

  async function handleDelete() {
    isDeleting = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isDeleting = false;
    open = false;
  }
</script>

<Button variant="destructive" onclick={() => (open = true)}>Delete Zone</Button>
<DeleteResource
  bind:open
  resourceType="Zone"
  resourceName="example.com"
  onDelete={handleDelete}
  {isDeleting}
/>
