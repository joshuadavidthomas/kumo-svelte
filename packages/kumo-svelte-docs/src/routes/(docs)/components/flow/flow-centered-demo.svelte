<script lang="ts">
  import * as Flow from "kumo-svelte/components/flow";
</script>

<Flow.Root align="center">
  <Flow.Node class="size-4 rounded-full bg-kumo-hairline p-0 shadow-none ring-0" />
  <Flow.Node>my-worker</Flow.Node>
  <Flow.Node class="rounded-md bg-kumo-base px-3 py-6 shadow ring ring-kumo-hairline">
    Taller node
  </Flow.Node>
</Flow.Root>
