<script lang="ts">
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
  import WarningOctagonIcon from "phosphor-svelte/lib/WarningOctagonIcon";
  import { Banner } from "kumo-svelte/components/banner";
</script>

<div class="flex flex-col gap-2">
  <Banner description="This is a default banner." />

  <Banner title="This is an alert banner." variant="alert">
    {#snippet icon()}
      <WarningIcon weight="fill" />
    {/snippet}
  </Banner>

  <Banner title="This is an error banner." variant="error">
    {#snippet icon()}
      <WarningOctagonIcon weight="fill" />
    {/snippet}
  </Banner>
</div>
