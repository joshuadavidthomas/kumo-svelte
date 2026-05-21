<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";

  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button
    onclick={() =>
      toastManager.add({
        title: "Deployment failed",
        description: "Unable to connect to the server.",
        variant: "error",
      })}
  >
    Show error toast
  </Button>
</Toasty>
