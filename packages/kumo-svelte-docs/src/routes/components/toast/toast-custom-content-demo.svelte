<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";
  import CustomToastContent from "./custom-toast-content.svelte";

  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button onclick={() => toastManager.add({ component: CustomToastContent })}>Show custom content</Button>
</Toasty>
