<script lang="ts">
  import { Collapsible, CollapsibleDefaultPanel, CollapsibleDefaultTrigger, Text } from "kumo-svelte";

  let open1 = $state(false);
  let open2 = $state(false);
  let open3 = $state(false);
</script>

<div class="w-full space-y-2">
  <Collapsible bind:open={open1}>
    <CollapsibleDefaultTrigger>What is Kumo?</CollapsibleDefaultTrigger>
    <CollapsibleDefaultPanel>
      <Text>Kumo is Cloudflare's new design system.</Text>
    </CollapsibleDefaultPanel>
  </Collapsible>

  <Collapsible bind:open={open2}>
    <CollapsibleDefaultTrigger>How do I use it?</CollapsibleDefaultTrigger>
    <CollapsibleDefaultPanel>
      <Text>Install the components and import them into your project.</Text>
    </CollapsibleDefaultPanel>
  </Collapsible>

  <Collapsible bind:open={open3}>
    <CollapsibleDefaultTrigger>Is it open source?</CollapsibleDefaultTrigger>
    <CollapsibleDefaultPanel>
      <Text>Check the repository for license information.</Text>
    </CollapsibleDefaultPanel>
  </Collapsible>
</div>
