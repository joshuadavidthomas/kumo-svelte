<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";

  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button
    variant="primary"
    onclick={() =>
      toastManager.add({
        title: "Deployed successfully",
        description: "Your Worker is now live.",
        variant: "success",
      })}
  >
    Deploy Worker
  </Button>
</Toasty>
