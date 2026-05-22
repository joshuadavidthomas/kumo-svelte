<script lang="ts">
  import { LayerCard } from "kumo-svelte";
</script>

<div class="flex flex-wrap gap-4">
  <LayerCard layered class="w-[200px]">
    <LayerCard.Secondary>Components</LayerCard.Secondary>
    <LayerCard.Primary>
      <p class="text-sm">Browse all components</p>
    </LayerCard.Primary>
  </LayerCard>

  <LayerCard layered class="w-[200px]">
    <LayerCard.Secondary>Examples</LayerCard.Secondary>
    <LayerCard.Primary>
      <p class="text-sm">View code examples</p>
    </LayerCard.Primary>
  </LayerCard>
</div>
