<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { createKumoToastManager, Toasty } from "kumo-svelte/components/toast";
  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button
    onclick={() =>
      toastManager.add({
        title: "Toast created",
        description: "This is a toast notification.",
        variant: "warning",
      })}
  >
    Give me a toast
  </Button>
</Toasty>
