<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import { Button, Tooltip, TooltipProvider } from "kumo-svelte";
</script>

<TooltipProvider>
  <Tooltip content="Add">
    <Button shape="square" aria-label="Add">
      <PlusIcon class="size-4" />
    </Button>
  </Tooltip>
</TooltipProvider>
