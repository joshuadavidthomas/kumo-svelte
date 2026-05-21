<script lang="ts">
  import { LayerCard, LayerCardPrimary, LayerCardSecondary } from "kumo-svelte";
</script>

<div class="flex flex-wrap gap-4">
  <LayerCard layered class="w-[200px]">
    <LayerCardSecondary>Components</LayerCardSecondary>
    <LayerCardPrimary>
      <p class="text-sm">Browse all components</p>
    </LayerCardPrimary>
  </LayerCard>

  <LayerCard layered class="w-[200px]">
    <LayerCardSecondary>Examples</LayerCardSecondary>
    <LayerCardPrimary>
      <p class="text-sm">View code examples</p>
    </LayerCardPrimary>
  </LayerCard>
</div>
