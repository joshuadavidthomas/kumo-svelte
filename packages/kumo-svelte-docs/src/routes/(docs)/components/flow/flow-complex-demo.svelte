<script lang="ts">
  import { Flow, FlowNode, FlowParallel } from "kumo-svelte";
</script>

<Flow>
  <FlowParallel>
    <FlowNode>HTTP Trigger</FlowNode>
    <FlowNode>Cron Trigger</FlowNode>
  </FlowParallel>
  <FlowNode>Process Request</FlowNode>
  <FlowParallel>
    <FlowNode>Log Analytics</FlowNode>
    <FlowNode>Update Cache</FlowNode>
    <FlowNode>Send Notification</FlowNode>
  </FlowParallel>
  <FlowNode>Complete</FlowNode>
</Flow>
