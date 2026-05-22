<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { createKumoToastManager, Toasty } from "kumo-svelte/components/toast";
  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button onclick={() => toastManager.add({ description: "Your changes have been saved successfully." })}>
    Description only
  </Button>
</Toasty>
