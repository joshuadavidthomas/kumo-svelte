<script lang="ts">
  import { Button, Collapsible, CollapsiblePanel, CollapsibleTrigger, Text } from "kumo-svelte";

  let open = $state(false);
</script>

<div class="w-full">
  <Collapsible bind:open>
    <CollapsibleTrigger>
      {#snippet child({ props })}
        <Button {...props} variant="secondary" size="sm">
          {open ? "Hide details" : "Show details"}
        </Button>
      {/snippet}
    </CollapsibleTrigger>
    <CollapsiblePanel class="mt-3 rounded-lg bg-kumo-tint p-4">
      <Text>This panel uses custom styling instead of the default border-left accent.</Text>
    </CollapsiblePanel>
  </Collapsible>
</div>
