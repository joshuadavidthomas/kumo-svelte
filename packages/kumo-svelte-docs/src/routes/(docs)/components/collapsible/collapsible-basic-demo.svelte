<script lang="ts">
  import { Text } from "kumo-svelte";
  import * as Collapsible from "kumo-svelte/components/collapsible";
  let open = $state(false);
</script>

<div class="w-full">
  <Collapsible.Root bind:open>
    <Collapsible.DefaultTrigger>What is Kumo?</Collapsible.DefaultTrigger>
    <Collapsible.DefaultPanel>
      <Text>Kumo is Cloudflare's new design system.</Text>
    </Collapsible.DefaultPanel>
  </Collapsible.Root>
</div>
