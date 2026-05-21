<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";

  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button
    onclick={() =>
      toastManager.add({
        title: "New version available",
        description: "Kumo v4.2 includes performance improvements.",
        variant: "info",
      })}
  >
    Show info toast
  </Button>
</Toasty>
