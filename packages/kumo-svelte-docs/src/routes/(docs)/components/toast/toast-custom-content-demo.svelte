<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { createKumoToastManager, Toasty } from "kumo-svelte/components/toast";
  import CustomToastContent from "./custom-toast-content.svelte";

  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button onclick={() => toastManager.add({ component: CustomToastContent })}>Show custom content</Button>
</Toasty>
