<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import { Button } from "kumo-svelte/components/button";
  import * as Tooltip from "kumo-svelte/components/tooltip";
</script>

<Tooltip.Provider>
  <Tooltip.Root content="Add new item">
    {#snippet render({ props })}
      <Button {...props} shape="square" aria-label="Add new item">
        <PlusIcon class="size-4" />
      </Button>
    {/snippet}
  </Tooltip.Root>
</Tooltip.Provider>
