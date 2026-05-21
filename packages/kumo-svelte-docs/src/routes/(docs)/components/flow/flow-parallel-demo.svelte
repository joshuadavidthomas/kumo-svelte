<script lang="ts">
  import { Flow, FlowNode, FlowParallel } from "kumo-svelte";
</script>

<Flow>
  <FlowNode>Start</FlowNode>
  <FlowParallel>
    <FlowNode>Branch A</FlowNode>
    <FlowNode>Branch B</FlowNode>
    <FlowNode>Branch C</FlowNode>
  </FlowParallel>
  <FlowNode>End</FlowNode>
</Flow>
