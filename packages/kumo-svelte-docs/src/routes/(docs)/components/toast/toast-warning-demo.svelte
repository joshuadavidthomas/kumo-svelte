<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { createKumoToastManager, Toasty } from "kumo-svelte/components/toast";
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
