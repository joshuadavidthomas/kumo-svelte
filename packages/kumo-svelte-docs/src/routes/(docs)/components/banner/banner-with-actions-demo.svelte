<script lang="ts">
  import { Banner, Button } from "kumo-svelte";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
</script>

{#snippet icon()}
  <WarningIcon weight="fill" />
{/snippet}

{#snippet actions()}
  <Button size="sm" variant="secondary">Dismiss</Button>
  <Button size="sm">Extend session</Button>
{/snippet}

<Banner
  {icon}
  variant="alert"
  title="Session expiring"
  description="Your session will expire in 5 minutes."
  action={actions}
/>
