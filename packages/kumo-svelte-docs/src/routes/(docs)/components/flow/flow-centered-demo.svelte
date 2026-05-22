<script lang="ts">
  import { type FlowNodeRenderProps } from "kumo-svelte";
  import * as Flow from "kumo-svelte/components/flow";
</script>

{#snippet dotNode({ action, attrs }: FlowNodeRenderProps)}
  <li use:action {...attrs} class="size-4 rounded-full bg-kumo-hairline"></li>
{/snippet}

{#snippet tallNode({ action, attrs }: FlowNodeRenderProps)}
  <li use:action {...attrs} class="rounded-md bg-kumo-base px-3 py-6 shadow ring ring-kumo-hairline">
    Taller node
  </li>
{/snippet}

<Flow.Root align="center">
  <Flow.Node render={dotNode} />
  <Flow.Node>my-worker</Flow.Node>
  <Flow.Node render={tallNode} />
</Flow.Root>
