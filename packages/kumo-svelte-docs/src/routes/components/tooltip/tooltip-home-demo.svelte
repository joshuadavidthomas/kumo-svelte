<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import TranslateIcon from "phosphor-svelte/lib/TranslateIcon";
  import { Button, Tooltip, TooltipProvider } from "kumo-svelte";
</script>

<TooltipProvider>
  <div class="flex gap-2">
    <Tooltip content="Add">
      <Button shape="square" aria-label="Add">
        <PlusIcon class="size-4" />
      </Button>
    </Tooltip>
    <Tooltip content="Change language">
      <Button shape="square" aria-label="Change language">
        <TranslateIcon class="size-4" />
      </Button>
    </Tooltip>
  </div>
</TooltipProvider>
