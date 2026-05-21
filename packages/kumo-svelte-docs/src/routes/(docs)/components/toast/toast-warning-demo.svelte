<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";

  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button
    onclick={() =>
      toastManager.add({
        title: "Rate limit warning",
        description: "You're approaching your API quota.",
        variant: "warning",
      })}
  >
    Show warning toast
  </Button>
</Toasty>
