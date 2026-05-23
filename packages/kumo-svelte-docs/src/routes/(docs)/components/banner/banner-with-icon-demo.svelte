<script lang="ts">
  import { Banner } from "kumo-svelte/components/banner";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
</script>

<Banner
  variant="alert"
  title="Review required"
  description="Please review your billing information before proceeding."
>
  {#snippet icon()}
    <WarningIcon weight="fill" />
  {/snippet}
</Banner>
