<script lang="ts">
  import ArrowRightIcon from "phosphor-svelte/lib/ArrowRightIcon";
  import { Button } from "kumo-svelte";
  import * as LayerCard from "kumo-svelte/components/layer-card";
</script>

<LayerCard.Root layered>
  <LayerCard.Secondary class="flex items-center justify-between">
    <div>Next Steps</div>
    <Button variant="ghost" size="sm" shape="square" aria-label="Go to next steps">
      <ArrowRightIcon size={16} />
    </Button>
  </LayerCard.Secondary>

  <LayerCard.Primary>Get started with Kumo</LayerCard.Primary>
</LayerCard.Root>
