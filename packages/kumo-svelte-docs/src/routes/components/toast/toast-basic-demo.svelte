<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";

  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button
    onclick={() =>
      toastManager.add({
        title: "Toast created",
        description: "This is a toast notification.",
      })}
  >
    Show toast
  </Button>
</Toasty>
