<script lang="ts">
  import { Flow, FlowNode } from "kumo-svelte";

  const steps = ["Start", "Authenticate", "Validate", "Transform", "Process", "Store", "Notify", "Log", "Complete", "End"];
</script>

<Flow class="rounded-lg border border-kumo-hairline">
  {#each steps as step}
    <FlowNode>{step}</FlowNode>
  {/each}
</Flow>
