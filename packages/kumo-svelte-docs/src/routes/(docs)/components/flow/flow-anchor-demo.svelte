<script lang="ts">
  import { type FlowNodeRenderProps } from "kumo-svelte";
  import * as Flow from "kumo-svelte/components/flow";
</script>

{#snippet workerNode({ action, attrs }: FlowNodeRenderProps)}
  <li use:action {...attrs} class="rounded-lg bg-kumo-overlay shadow-none ring ring-kumo-hairline">
    <div class="flex h-10 items-center px-2.5 text-kumo-subtle">my-worker</div>
    <div class="m-1.5 mt-0 rounded bg-kumo-base px-2 py-1.5 shadow ring ring-kumo-hairline">
      Bindings <span class="ml-3 w-5 text-kumo-subtle">2</span>
    </div>
  </li>
{/snippet}

<Flow.Root>
  <Flow.Node>Load balancer</Flow.Node>
  <Flow.Node render={workerNode} />
  <Flow.Parallel>
    <Flow.Node>DATABASE</Flow.Node>
    <Flow.Node>OTHER_SERVICE</Flow.Node>
  </Flow.Parallel>
</Flow.Root>
