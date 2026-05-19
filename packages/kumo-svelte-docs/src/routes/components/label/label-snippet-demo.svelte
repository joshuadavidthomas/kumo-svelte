<script lang="ts">
  import { Checkbox } from "kumo-svelte";
</script>

{#snippet label()}
  <span>I agree to the <strong>Terms of Service</strong></span>
{/snippet}

<Checkbox {label} />
