<script lang="ts">
  import { Banner } from "kumo-svelte/components/banner";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
</script>

<Banner
  variant="alert"
  title="Session expiring"
  description="Your session will expire in 5 minutes."
>
  {#snippet icon()}
    <WarningIcon weight="fill" />
  {/snippet}
</Banner>
