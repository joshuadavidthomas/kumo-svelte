<script lang="ts">
  import { LayerCard, LayerCardPrimary, LayerCardSecondary } from "kumo-svelte";
</script>

<LayerCard layered class="w-[250px]">
  <LayerCardSecondary data-testid="card-header">Getting Started</LayerCardSecondary>
  <LayerCardPrimary data-testid="card-body">
    <p class="text-sm text-kumo-subtle">Quick start guide for new users</p>
  </LayerCardPrimary>
</LayerCard>
