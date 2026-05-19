<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";

  const toastManager = createKumoToastManager();

  function showMultiple() {
    toastManager.add({ title: "First toast", description: "This is the first notification." });
    setTimeout(() => {
      toastManager.add({ title: "Second toast", description: "This is the second notification." });
    }, 500);
    setTimeout(() => {
      toastManager.add({ title: "Third toast", description: "This is the third notification." });
    }, 1000);
  }
</script>

<Toasty>
  <Button onclick={showMultiple}>Show multiple toasts</Button>
</Toasty>
