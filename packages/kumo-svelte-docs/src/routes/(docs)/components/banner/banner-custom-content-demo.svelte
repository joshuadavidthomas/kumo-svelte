<script lang="ts">
  import { Banner } from "kumo-svelte/components/banner";
  import { Text } from "kumo-svelte/components/text";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
</script>

{#snippet icon()}
  <InfoIcon weight="fill" />
{/snippet}

{#snippet description()}
  <Text class="text-inherit">
    This banner supports <strong>custom content</strong> with Text.
  </Text>
{/snippet}

<Banner {icon} title="Custom content supported" {description} />
