<script lang="ts">
  import * as Flow from "kumo-svelte/components/flow";
</script>

<Flow.Root>
  <Flow.Node>Load balancer</Flow.Node>
  <Flow.Node class="rounded-lg bg-kumo-overlay p-0 shadow-none ring ring-kumo-hairline">
    <Flow.Anchor type="end" class="flex h-10 items-center px-2.5 text-kumo-subtle">
      my-worker
    </Flow.Anchor>
    <Flow.Anchor type="start" class="m-1.5 mt-0 rounded bg-kumo-base px-2 py-1.5 shadow ring ring-kumo-hairline">
      Bindings <span class="ml-3 w-5 text-kumo-subtle">2</span>
    </Flow.Anchor>
  </Flow.Node>
  <Flow.Parallel>
    <Flow.Node>DATABASE</Flow.Node>
    <Flow.Node>OTHER_SERVICE</Flow.Node>
  </Flow.Parallel>
</Flow.Root>
