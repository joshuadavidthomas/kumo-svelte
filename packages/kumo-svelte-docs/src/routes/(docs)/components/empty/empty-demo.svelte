<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { Empty } from "kumo-svelte/components/empty";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import PackageIcon from "phosphor-svelte/lib/PackageIcon";
</script>

{#snippet packageIcon()}
  <PackageIcon size={48} />
{/snippet}

{#snippet actions()}
  <div class="flex items-center gap-2">
    <Button icon={CodeIcon}>See examples</Button>
    <Button icon={GlobeIcon} variant="primary">View documentation</Button>
  </div>
{/snippet}

<Empty
  icon={packageIcon}
  title="No packages found"
  description="Get started by installing your first package."
  commandLine="npm install @cloudflare/kumo"
  contents={actions}
/>
