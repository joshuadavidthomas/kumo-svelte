<script lang="ts">
  import { Banner } from "kumo-svelte/components/banner";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
  import WarningCircleIcon from "phosphor-svelte/lib/WarningCircleIcon";
</script>

<div class="w-full space-y-3">
  <Banner title="Update available" description="A new version is ready to install.">
    {#snippet icon()}
      <InfoIcon weight="fill" />
    {/snippet}
  </Banner>

  <Banner
    variant="alert"
    title="Session expiring"
    description="Your session will expire in 5 minutes."
  >
    {#snippet icon()}
      <WarningIcon weight="fill" />
    {/snippet}
  </Banner>

  <Banner
    variant="error"
    title="Save failed"
    description="We couldn't save your changes. Please try again."
  >
    {#snippet icon()}
      <WarningCircleIcon weight="fill" />
    {/snippet}
  </Banner>

  <Banner
    variant="secondary"
    title="Maintenance scheduled"
    description="This service will be unavailable for 10 minutes."
  >
    {#snippet icon()}
      <InfoIcon weight="fill" />
    {/snippet}
  </Banner>
</div>
