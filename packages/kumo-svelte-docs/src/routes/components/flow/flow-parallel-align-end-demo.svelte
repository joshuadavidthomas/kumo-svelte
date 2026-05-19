<script lang="ts">
  import { Flow, FlowNode, FlowParallel } from "kumo-svelte";
</script>

<Flow>
  <FlowNode>Start</FlowNode>
  <FlowParallel align="end">
    <FlowNode>Short</FlowNode>
    <FlowNode>Medium Length</FlowNode>
    <FlowNode>Very Long Node Name</FlowNode>
  </FlowParallel>
  <FlowNode>End</FlowNode>
</Flow>
