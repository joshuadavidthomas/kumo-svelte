<script lang="ts">
  import ArrowRightIcon from "phosphor-svelte/lib/ArrowRightIcon";
  import { Button, LayerCard, LayerCardPrimary, LayerCardSecondary } from "kumo-svelte";
</script>

<LayerCard layered>
  <LayerCardSecondary class="flex items-center justify-between">
    <div>Next Steps</div>
    <Button variant="ghost" size="sm" shape="square" aria-label="Go to next steps">
      <ArrowRightIcon size={16} />
    </Button>
  </LayerCardSecondary>

  <LayerCardPrimary>Get started with Kumo</LayerCardPrimary>
</LayerCard>
