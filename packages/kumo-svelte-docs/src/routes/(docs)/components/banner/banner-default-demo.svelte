<script lang="ts">
  import { Banner } from "kumo-svelte/components/banner";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
</script>

<Banner title="Update available" description="A new version is ready to install.">
  {#snippet icon()}
    <InfoIcon weight="fill" />
  {/snippet}
</Banner>
