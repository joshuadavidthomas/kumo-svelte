<script lang="ts">
  import { Banner, Text } from "kumo-svelte";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
</script>

{#snippet icon()}
  <InfoIcon weight="fill" />
{/snippet}

{#snippet description()}
  <Text DANGEROUS_className="text-inherit">
    This banner supports <strong>custom content</strong> with Text.
  </Text>
{/snippet}

<Banner {icon} title="Custom content supported" {description} />
