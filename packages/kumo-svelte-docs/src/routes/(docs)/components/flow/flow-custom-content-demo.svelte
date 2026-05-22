<script lang="ts">
  import { type FlowNodeRenderProps } from "kumo-svelte/components/flow";
  import * as Flow from "kumo-svelte/components/flow";
</script>

{#snippet dotNode({ action, attrs }: FlowNodeRenderProps)}
  <li use:action {...attrs} class="size-4 rounded-full bg-kumo-hairline"></li>
{/snippet}

{#snippet workerNode({ action, attrs }: FlowNodeRenderProps)}
  <li use:action {...attrs} class="rounded-lg bg-kumo-contrast px-3 py-2 font-medium text-kumo-inverse">
    my-worker
  </li>
{/snippet}

<Flow.Root>
  <Flow.Node render={dotNode} />
  <Flow.Node render={workerNode} />
</Flow.Root>
