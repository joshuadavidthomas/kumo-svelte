<script lang="ts">
  import { Flow, FlowNode, FlowParallel } from "kumo-svelte";
</script>

<Flow>
  <FlowNode>Request</FlowNode>
  <FlowParallel>
    <FlowNode>Primary Handler</FlowNode>
    <FlowNode disabled>Backup Handler (disabled)</FlowNode>
  </FlowParallel>
  <FlowNode>Response</FlowNode>
</Flow>
