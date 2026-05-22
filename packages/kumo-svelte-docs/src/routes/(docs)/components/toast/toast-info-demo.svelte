<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { createKumoToastManager, Toasty } from "kumo-svelte/components/toast";
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
