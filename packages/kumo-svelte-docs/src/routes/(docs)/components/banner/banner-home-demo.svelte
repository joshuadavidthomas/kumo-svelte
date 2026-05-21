<script lang="ts">
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
  import WarningOctagonIcon from "phosphor-svelte/lib/WarningOctagonIcon";
  import { Banner } from "kumo-svelte";
</script>

{#snippet warningIcon()}
  <WarningIcon weight="fill" />
{/snippet}

{#snippet warningOctagonIcon()}
  <WarningOctagonIcon weight="fill" />
{/snippet}

<div class="flex flex-col gap-2">
  <Banner text="This is a default banner." />
  <Banner icon={warningIcon} text="This is an alert banner." variant="alert" />
  <Banner icon={warningOctagonIcon} text="This is an error banner." variant="error" />
</div>
