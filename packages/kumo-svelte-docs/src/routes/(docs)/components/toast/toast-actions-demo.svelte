<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";

  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button
    onclick={() =>
      toastManager.add({
        title: "Need help?",
        description: "Get assistance with your deployment.",
        action: {
          label: "Ask AI",
          onClick: () => console.log("Ask AI clicked"),
        },
        cancel: {
          label: "Support",
          onClick: () => console.log("Support clicked"),
        },
      })}
  >
    Show with actions
  </Button>
</Toasty>
