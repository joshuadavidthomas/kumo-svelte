<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import TranslateIcon from "phosphor-svelte/lib/TranslateIcon";
  import { Button, Tooltip } from "kumo-svelte";
</script>

<Tooltip.Provider>
  <div class="flex gap-2">
    <Tooltip content="Add" open>
      {#snippet render({ props })}
        <Button {...props} shape="square" aria-label="Add">
          <PlusIcon class="size-4" />
        </Button>
      {/snippet}
    </Tooltip>
    <Tooltip content="Change language">
      {#snippet render({ props })}
        <Button {...props} shape="square" aria-label="Change language">
          <TranslateIcon class="size-4" />
        </Button>
      {/snippet}
    </Tooltip>
  </div>
</Tooltip.Provider>
