<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { DeleteResource } from "kumo-svelte/blocks/delete-resource";
  let open = $state(false);
  let isDeleting = $state(false);
  let errorMessage = $state("");

  async function handleDelete() {
    errorMessage = "";
    isDeleting = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isDeleting = false;
    errorMessage = "Something went wrong";
  }
</script>

<Button variant="destructive" onclick={() => (open = true)}>Delete Zone</Button>
<DeleteResource
  bind:open
  resourceType="Zone"
  resourceName="example.com"
  onDelete={handleDelete}
  {isDeleting}
  {errorMessage}
/>
