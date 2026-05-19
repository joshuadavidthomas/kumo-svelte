<script lang="ts">
  import { Banner } from "kumo-svelte";
  import WarningCircleIcon from "phosphor-svelte/lib/WarningCircleIcon";
</script>

{#snippet icon()}
  <WarningCircleIcon weight="fill" />
{/snippet}

<Banner
  {icon}
  variant="error"
  title="Save failed"
  description="We couldn't save your changes. Please try again."
/>
