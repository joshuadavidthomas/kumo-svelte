<script lang="ts">
  import { Banner } from "kumo-svelte/components/banner";
  import WarningCircleIcon from "phosphor-svelte/lib/WarningCircleIcon";
</script>

<Banner
  variant="error"
  title="Save failed"
  description="We couldn't save your changes. Please try again."
>
  {#snippet icon()}
    <WarningCircleIcon weight="fill" />
  {/snippet}
</Banner>
