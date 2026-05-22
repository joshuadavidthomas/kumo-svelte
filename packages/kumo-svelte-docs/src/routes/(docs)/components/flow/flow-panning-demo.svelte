<script lang="ts">
  import * as Flow from "kumo-svelte/components/flow";
  const steps = ["Start", "Authenticate", "Validate", "Transform", "Process", "Store", "Notify", "Log", "Complete", "End"];
</script>

<Flow.Root class="rounded-lg border border-kumo-hairline">
  {#each steps as step}
    <Flow.Node>{step}</Flow.Node>
  {/each}
</Flow.Root>
