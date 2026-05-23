<script lang="ts">
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
  import WarningOctagonIcon from "phosphor-svelte/lib/WarningOctagonIcon";
  import { Banner } from "kumo-svelte/components/banner";
</script>

<div class="flex flex-col gap-2">
  <Banner>This is a default banner.</Banner>

  <Banner variant="alert">
    {#snippet icon()}
      <WarningIcon weight="fill" />
    {/snippet}

    This is an alert banner.
  </Banner>

  <Banner variant="error">
    {#snippet icon()}
      <WarningOctagonIcon weight="fill" />
    {/snippet}

    This is an error banner.
  </Banner>
</div>
