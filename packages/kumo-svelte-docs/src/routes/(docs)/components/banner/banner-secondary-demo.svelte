<script lang="ts">
  import { Banner } from "kumo-svelte/components/banner";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
</script>

<Banner
  variant="secondary"
  title="Maintenance scheduled"
  description="This service will be unavailable for 10 minutes."
>
  {#snippet icon()}
    <InfoIcon weight="fill" />
  {/snippet}
</Banner>
