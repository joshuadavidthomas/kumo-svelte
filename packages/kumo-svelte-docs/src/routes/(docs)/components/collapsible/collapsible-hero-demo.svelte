<script lang="ts">
  import { Collapsible, CollapsibleDefaultPanel, CollapsibleDefaultTrigger, Text } from "kumo-svelte";

  let open = $state(true);
</script>

<div class="w-full">
  <Collapsible bind:open>
    <CollapsibleDefaultTrigger>What is Kumo?</CollapsibleDefaultTrigger>
    <CollapsibleDefaultPanel>
      <Text>Kumo is Cloudflare's new design system.</Text>
    </CollapsibleDefaultPanel>
  </Collapsible>
</div>
