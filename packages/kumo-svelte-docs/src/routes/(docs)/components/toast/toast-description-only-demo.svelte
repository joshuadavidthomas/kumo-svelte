<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";

  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button onclick={() => toastManager.add({ description: "Your changes have been saved successfully." })}>
    Description only
  </Button>
</Toasty>
