<script lang="ts">
  import { Banner } from "kumo-svelte/components/banner";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
  import WarningCircleIcon from "phosphor-svelte/lib/WarningCircleIcon";
</script>

{#snippet infoIcon()}
  <InfoIcon weight="fill" />
{/snippet}

{#snippet warningIcon()}
  <WarningIcon weight="fill" />
{/snippet}

{#snippet warningCircleIcon()}
  <WarningCircleIcon weight="fill" />
{/snippet}

<div class="w-full space-y-3">
  <Banner
    icon={infoIcon}
    title="Update available"
    description="A new version is ready to install."
  />
  <Banner
    icon={warningIcon}
    variant="alert"
    title="Session expiring"
    description="Your session will expire in 5 minutes."
  />
  <Banner
    icon={warningCircleIcon}
    variant="error"
    title="Save failed"
    description="We couldn't save your changes. Please try again."
  />
</div>
