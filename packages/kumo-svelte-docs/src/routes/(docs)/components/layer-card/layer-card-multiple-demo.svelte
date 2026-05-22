<script lang="ts">
  import * as LayerCard from "kumo-svelte/components/layer-card";
</script>

<div class="flex flex-wrap gap-4">
  <LayerCard.Root layered class="w-[200px]">
    <LayerCard.Secondary>Components</LayerCard.Secondary>
    <LayerCard.Primary>
      <p class="text-sm">Browse all components</p>
    </LayerCard.Primary>
  </LayerCard.Root>

  <LayerCard.Root layered class="w-[200px]">
    <LayerCard.Secondary>Examples</LayerCard.Secondary>
    <LayerCard.Primary>
      <p class="text-sm">View code examples</p>
    </LayerCard.Primary>
  </LayerCard.Root>
</div>
