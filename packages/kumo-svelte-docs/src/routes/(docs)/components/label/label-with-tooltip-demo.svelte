<script lang="ts">
  import { Input } from "kumo-svelte";
</script>

{#snippet labelTooltip()}
  Find this in your dashboard settings under API > Keys
{/snippet}

<Input label="API Key" {labelTooltip} placeholder="sk_live_..." />
