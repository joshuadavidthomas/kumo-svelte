<script lang="ts">
  import { Input, Text } from "kumo-svelte";
  import * as Collapsible from "kumo-svelte/components/collapsible";
  let open = $state(true);
</script>

<div class="w-full space-y-4">
  <Collapsible.Root bind:open>
    <Collapsible.DefaultTrigger>Edit details</Collapsible.DefaultTrigger>
    <Collapsible.DefaultPanel forceMount>
      <Text>
        Type something below, then collapse and re-open — your input is preserved because the
        panel stays mounted.
      </Text>
      <Input label="Name" placeholder="Type here…" />
    </Collapsible.DefaultPanel>
  </Collapsible.Root>
</div>
