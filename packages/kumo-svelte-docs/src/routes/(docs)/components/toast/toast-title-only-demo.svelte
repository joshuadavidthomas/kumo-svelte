<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { createKumoToastManager, Toasty } from "kumo-svelte/components/toast";
  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button onclick={() => toastManager.add({ title: "Settings saved" })}>Title only</Button>
</Toasty>
