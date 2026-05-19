<script lang="ts">
  import { Collapsible, CollapsiblePanel, CollapsibleTrigger, Text } from "kumo-svelte";

  let open = $state(false);
</script>

<div class="w-full">
  <Collapsible bind:open>
    <CollapsibleTrigger
      class="rounded-md border border-kumo-line bg-kumo-elevated px-3 py-1.5 text-sm font-medium text-kumo-default hover:bg-kumo-tint"
    >
      {open ? "Hide details" : "Show details"}
    </CollapsibleTrigger>
    <CollapsiblePanel class="mt-3 rounded-lg bg-kumo-tint p-4">
      <Text>This panel uses custom styling instead of the default border-left accent.</Text>
    </CollapsiblePanel>
  </Collapsible>
</div>
