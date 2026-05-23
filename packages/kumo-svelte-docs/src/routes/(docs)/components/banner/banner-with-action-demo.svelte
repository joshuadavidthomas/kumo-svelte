<script lang="ts">
  import { Banner } from "kumo-svelte/components/banner";
  import { Button } from "kumo-svelte/components/button";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
  import XIcon from "phosphor-svelte/lib/XIcon";
</script>

<div class="w-full space-y-3">
  <Banner title="Update available" description="A new version is ready to install.">
    {#snippet icon()}
      <InfoIcon weight="fill" />
    {/snippet}

    {#snippet action()}
      <Button size="sm">Update now</Button>
    {/snippet}
  </Banner>

  <Banner title="Update available" description="A new version is ready to install.">
    {#snippet icon()}
      <InfoIcon weight="fill" />
    {/snippet}

    {#snippet action()}
      <Button size="sm" variant="ghost" shape="square" icon={XIcon} aria-label="Dismiss" />
    {/snippet}
  </Banner>
</div>
