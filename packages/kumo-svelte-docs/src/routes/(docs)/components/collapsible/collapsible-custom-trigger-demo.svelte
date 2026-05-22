<script lang="ts">
  import { Button, Text } from "kumo-svelte";
  import * as Collapsible from "kumo-svelte/components/collapsible";
  let open = $state(false);
</script>

<div class="w-full">
  <Collapsible.Root bind:open>
    <Collapsible.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant="secondary" size="sm">
          {open ? "Hide details" : "Show details"}
        </Button>
      {/snippet}
    </Collapsible.Trigger>
    <Collapsible.Panel class="mt-3 rounded-lg bg-kumo-tint p-4">
      <Text>This panel uses custom styling instead of the default border-left accent.</Text>
    </Collapsible.Panel>
  </Collapsible.Root>
</div>
