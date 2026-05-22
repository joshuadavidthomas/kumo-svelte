<script lang="ts">
  import { Collapsible } from "kumo-svelte";

  let open = $state(false);
</script>

<Collapsible bind:open>
  <Collapsible.DefaultTrigger>What is Kumo?</Collapsible.DefaultTrigger>
  <Collapsible.DefaultPanel>Kumo is Cloudflare's component library.</Collapsible.DefaultPanel>
</Collapsible>
