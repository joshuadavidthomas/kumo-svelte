<script lang="ts">
  import { Badge, RadioGroup, RadioItem } from "kumo-svelte";

  let value = $state("pro");
</script>

{#snippet freeLabel()}
  <span class="flex items-center gap-2">Free <Badge variant="neutral">$0</Badge></span>
{/snippet}

{#snippet proLabel()}
  <span class="flex items-center gap-2">Pro <Badge variant="primary">Popular</Badge></span>
{/snippet}

<RadioGroup legend="Choose a plan" appearance="card" {value} onValueChange={(next) => (value = next)}>
  <RadioItem label={freeLabel} description="For personal or hobby projects." value="free" />
  <RadioItem label={proLabel} description="For professional websites." value="pro" />
</RadioGroup>
