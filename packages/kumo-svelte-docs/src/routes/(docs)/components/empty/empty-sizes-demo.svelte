<script lang="ts">
  import { Empty } from "kumo-svelte/components/empty";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
</script>

{#snippet smallIcon()}
  <DatabaseIcon size={32} class="text-kumo-inactive" />
{/snippet}

{#snippet baseIcon()}
  <DatabaseIcon size={48} class="text-kumo-inactive" />
{/snippet}

{#snippet largeIcon()}
  <DatabaseIcon size={64} class="text-kumo-inactive" />
{/snippet}

<div class="flex flex-col gap-8">
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Small</p>
    <Empty size="sm" icon={smallIcon} title="No data available" description="There is no data to display." />
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Base</p>
    <Empty size="base" icon={baseIcon} title="No data available" description="There is no data to display." />
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Large</p>
    <Empty size="lg" icon={largeIcon} title="No data available" description="There is no data to display." />
  </div>
</div>
