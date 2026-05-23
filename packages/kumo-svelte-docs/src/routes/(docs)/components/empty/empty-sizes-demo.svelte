<script lang="ts">
  import { Empty } from "kumo-svelte/components/empty";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
</script>

<div class="flex flex-col gap-8">
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Small</p>
    <Empty size="sm" title="No data available" description="There is no data to display.">
      {#snippet icon()}
        <DatabaseIcon size={32} class="text-kumo-inactive" />
      {/snippet}
    </Empty>
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Base</p>
    <Empty size="base" title="No data available" description="There is no data to display.">
      {#snippet icon()}
        <DatabaseIcon size={48} class="text-kumo-inactive" />
      {/snippet}
    </Empty>
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Large</p>
    <Empty size="lg" title="No data available" description="There is no data to display.">
      {#snippet icon()}
        <DatabaseIcon size={64} class="text-kumo-inactive" />
      {/snippet}
    </Empty>
  </div>
</div>
