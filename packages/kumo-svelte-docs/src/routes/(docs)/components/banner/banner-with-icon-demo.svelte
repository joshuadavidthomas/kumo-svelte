<script lang="ts">
  import { Banner } from "kumo-svelte/components/banner";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
</script>

{#snippet icon()}
  <WarningIcon weight="fill" />
{/snippet}

<Banner
  {icon}
  variant="alert"
  title="Review required"
  description="Please review your billing information before proceeding."
/>
