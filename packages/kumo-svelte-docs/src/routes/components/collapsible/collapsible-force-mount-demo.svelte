<script lang="ts">
  import { Collapsible, CollapsibleDefaultPanel, CollapsibleDefaultTrigger, Input, Text } from "kumo-svelte";

  let open = $state(true);
</script>

<div class="w-full space-y-4">
  <Collapsible bind:open>
    <CollapsibleDefaultTrigger>Edit details</CollapsibleDefaultTrigger>
    <CollapsibleDefaultPanel forceMount>
      <Text>
        Type something below, then collapse and re-open — your input is preserved because the
        panel stays mounted.
      </Text>
      <Input label="Name" placeholder="Type here…" />
    </CollapsibleDefaultPanel>
  </Collapsible>
</div>
