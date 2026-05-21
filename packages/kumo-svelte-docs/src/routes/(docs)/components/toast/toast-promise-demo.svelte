<script lang="ts">
  import { Button, createKumoToastManager, Toasty } from "kumo-svelte";

  const toastManager = createKumoToastManager();

  function simulateDeployment() {
    return new Promise<{ name: string }>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve({ name: "my-worker" });
        } else {
          reject(new Error("Network error"));
        }
      }, 2000);
    });
  }
</script>

<Toasty>
  <Button
    onclick={() =>
      toastManager.promise(simulateDeployment(), {
        loading: "Deploying...",
        success: (data) => `Worker \"${(data as { name: string }).name}\" is now live.`,
        error: (error) => (error instanceof Error ? error.message : "Deployment failed"),
      })}
  >
    Deploy with promise
  </Button>
</Toasty>
