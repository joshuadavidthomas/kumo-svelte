<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import TranslateIcon from "phosphor-svelte/lib/TranslateIcon";
  import { Button } from "kumo-svelte/components/button";
  import * as Tooltip from "kumo-svelte/components/tooltip";
</script>

<Tooltip.Provider>
  <div class="flex gap-2">
    <Tooltip.Root content="Add">
      {#snippet render({ props })}
        <Button {...props} shape="square" aria-label="Add">
          <PlusIcon class="size-4" />
        </Button>
      {/snippet}
    </Tooltip.Root>
    <Tooltip.Root content="Change language">
      {#snippet render({ props })}
        <Button {...props} shape="square" aria-label="Change language">
          <TranslateIcon class="size-4" />
        </Button>
      {/snippet}
    </Tooltip.Root>
  </div>
</Tooltip.Provider>
