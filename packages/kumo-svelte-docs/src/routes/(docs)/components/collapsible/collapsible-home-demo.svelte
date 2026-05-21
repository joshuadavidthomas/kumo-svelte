<script lang="ts">
  import { Collapsible, CollapsibleDefaultPanel, CollapsibleDefaultTrigger } from "kumo-svelte";

  let open = $state(false);
</script>

<Collapsible bind:open>
  <CollapsibleDefaultTrigger>What is Kumo?</CollapsibleDefaultTrigger>
  <CollapsibleDefaultPanel>Kumo is Cloudflare's component library.</CollapsibleDefaultPanel>
</Collapsible>
