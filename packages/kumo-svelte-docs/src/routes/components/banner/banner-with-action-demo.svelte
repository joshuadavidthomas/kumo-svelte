<script lang="ts">
  import { Banner, Button } from "kumo-svelte";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
  import XIcon from "phosphor-svelte/lib/XIcon";
</script>

{#snippet icon()}
  <InfoIcon weight="fill" />
{/snippet}

{#snippet updateAction()}
  <Button size="sm">Update now</Button>
{/snippet}

{#snippet dismissAction()}
  <Button size="sm" variant="ghost" shape="square" icon={XIcon} aria-label="Dismiss" />
{/snippet}

<div class="w-full space-y-3">
  <Banner
    {icon}
    title="Update available"
    description="A new version is ready to install."
    action={updateAction}
  />
  <Banner
    {icon}
    title="Update available"
    description="A new version is ready to install."
    action={dismissAction}
  />
</div>
