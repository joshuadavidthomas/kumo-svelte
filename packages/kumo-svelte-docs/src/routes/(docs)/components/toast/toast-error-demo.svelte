<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { createKumoToastManager, Toasty } from "kumo-svelte/components/toast";
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
