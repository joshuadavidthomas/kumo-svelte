<script lang="ts">
  import { Banner } from "kumo-svelte";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
</script>

{#snippet icon()}
  <InfoIcon weight="fill" />
{/snippet}

<Banner
  {icon}
  title="Update available"
  description="A new version is ready to install."
/>
