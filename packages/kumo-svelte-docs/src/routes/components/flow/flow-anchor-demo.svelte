<script lang="ts">
  import { Flow, FlowNode, FlowParallel, type FlowNodeRenderProps } from "kumo-svelte";
</script>

{#snippet workerNode({ action, attrs }: FlowNodeRenderProps)}
  <li use:action {...attrs} class="rounded-lg bg-kumo-overlay shadow-none ring ring-kumo-hairline">
    <div class="flex h-10 items-center px-2.5 text-kumo-subtle">my-worker</div>
    <div class="m-1.5 mt-0 rounded bg-kumo-base px-2 py-1.5 shadow ring ring-kumo-hairline">
      Bindings <span class="ml-3 w-5 text-kumo-subtle">2</span>
    </div>
  </li>
{/snippet}

<Flow>
  <FlowNode>Load balancer</FlowNode>
  <FlowNode render={workerNode} />
  <FlowParallel>
    <FlowNode>DATABASE</FlowNode>
    <FlowNode>OTHER_SERVICE</FlowNode>
  </FlowParallel>
</Flow>
