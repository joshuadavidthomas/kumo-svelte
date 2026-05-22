<script lang="ts">
  import { InputArea } from "kumo-svelte/components/input";
</script>

{#snippet labelTooltip()}
  Enter your Cloudflare Worker script code here
{/snippet}

<InputArea
  label="Worker Script"
  {labelTooltip}
  placeholder="export default &#123; async fetch(request) &#123; ... &#125; &#125;"
  rows={4}
/>
