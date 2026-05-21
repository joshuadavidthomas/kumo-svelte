<script lang="ts">
  import { Banner } from "kumo-svelte";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
</script>

{#snippet icon()}
  <WarningIcon weight="fill" />
{/snippet}

<Banner
  {icon}
  variant="alert"
  title="Session expiring"
  description="Your session will expire in 5 minutes."
/>
