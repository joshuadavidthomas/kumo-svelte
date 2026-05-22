<script lang="ts">
  import * as Checkbox from "kumo-svelte/components/checkbox";
</script>

{#snippet label()}
  <span>I agree to the <strong>Terms of Service</strong></span>
{/snippet}

<Checkbox.Root {label} />
