<script lang="ts">
  import * as Collapsible from "kumo-svelte/components/collapsible";
  let open = $state(false);
</script>

<Collapsible.Root bind:open>
  <Collapsible.DefaultTrigger>What is Kumo?</Collapsible.DefaultTrigger>
  <Collapsible.DefaultPanel>Kumo is Cloudflare's component library.</Collapsible.DefaultPanel>
</Collapsible.Root>
