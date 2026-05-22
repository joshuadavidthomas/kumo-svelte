<script lang="ts">
  import { ChartPalette } from "kumo-svelte/components/chart";
</script>

<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
  {#each Array.from({ length: 6 }) as _, index}
    <div class="rounded-lg border border-kumo-hairline bg-kumo-base p-3">
      <div class="mb-2 h-12 rounded-md" style:background-color={ChartPalette.categorical(index)}></div>
      <div class="font-mono text-xs">categorical({index})</div>
    </div>
  {/each}
</div>
