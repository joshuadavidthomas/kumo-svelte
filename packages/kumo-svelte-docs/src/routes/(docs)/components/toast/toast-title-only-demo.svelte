<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";

  const toastManager = createKumoToastManager();
</script>

<Toasty>
  <Button onclick={() => toastManager.add({ title: "Settings saved" })}>Title only</Button>
</Toasty>
