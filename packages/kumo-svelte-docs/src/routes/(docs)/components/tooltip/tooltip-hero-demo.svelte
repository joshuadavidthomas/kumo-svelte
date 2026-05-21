<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import { Button, Tooltip, TooltipProvider } from "kumo-svelte";
</script>

<TooltipProvider>
  <Tooltip content="Add new item">
    {#snippet render({ props })}
      <Button {...props} shape="square" aria-label="Add new item">
        <PlusIcon class="size-4" />
      </Button>
    {/snippet}
  </Tooltip>
</TooltipProvider>
