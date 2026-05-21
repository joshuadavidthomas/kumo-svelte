<script lang="ts">
  import { Flow, FlowList, FlowNode, FlowParallel } from "kumo-svelte";
</script>

<Flow>
  <FlowParallel>
    <FlowList>
      <FlowNode>Client Users</FlowNode>
      <FlowNode>Engineering Team Access</FlowNode>
    </FlowList>
    <FlowList>
      <FlowParallel>
        <FlowNode>All Authenticated Users</FlowNode>
        <FlowNode>Client Users</FlowNode>
        <FlowNode>Site Users</FlowNode>
      </FlowParallel>
      <FlowNode>Contractor Access</FlowNode>
    </FlowList>
  </FlowParallel>
  <FlowNode>Destinations</FlowNode>
</Flow>
