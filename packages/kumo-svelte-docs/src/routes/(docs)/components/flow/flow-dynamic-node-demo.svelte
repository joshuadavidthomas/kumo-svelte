<script lang="ts">
  import * as Flow from "kumo-svelte/components/flow";

  const middle = { id: "dynamic-middle", label: "Middle" };
  let nodes = $state([
    { id: "dynamic-start", label: "Start" },
    { id: "dynamic-end", label: "End" },
  ]);
  let showMiddle = $derived(nodes.some((node) => node.id === middle.id));

  function toggleMiddle() {
    if (showMiddle) {
      nodes = nodes.filter((node) => node.id !== middle.id);
      return;
    }

    const endIndex = nodes.findIndex((node) => node.id === "dynamic-end");
    nodes = [...nodes.slice(0, endIndex), middle, ...nodes.slice(endIndex)];
  }
</script>

<div class="flex flex-col items-center gap-6">
  <div class="flex gap-2">
    <button
      type="button"
      onclick={toggleMiddle}
      class="rounded-md bg-kumo-elevated px-3 py-1.5 text-sm font-medium text-kumo-default ring ring-kumo-line transition-colors hover:bg-kumo-base"
    >
      {showMiddle ? "Remove middle node" : "Add middle node"}
    </button>
    <button
      type="button"
      onclick={() => (nodes = [...nodes].reverse())}
      class="rounded-md bg-kumo-elevated px-3 py-1.5 text-sm font-medium text-kumo-default ring ring-kumo-line transition-colors hover:bg-kumo-base"
    >
      Reverse order
    </button>
  </div>
  <Flow.Root>
    {#each nodes as node (node.id)}
      <Flow.Node id={node.id}>{node.label}</Flow.Node>
    {/each}
  </Flow.Root>
</div>
