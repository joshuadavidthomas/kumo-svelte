<script lang="ts">
  import { Collapsible, Text } from "kumo-svelte";

  let open = $state(false);
</script>

<div class="w-full">
  <Collapsible bind:open>
    <Collapsible.DefaultTrigger>What is Kumo?</Collapsible.DefaultTrigger>
    <Collapsible.DefaultPanel>
      <Text>Kumo is Cloudflare's new design system.</Text>
    </Collapsible.DefaultPanel>
  </Collapsible>
</div>
