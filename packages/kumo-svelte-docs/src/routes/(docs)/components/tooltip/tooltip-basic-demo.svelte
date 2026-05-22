<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import { Button, Tooltip } from "kumo-svelte";
</script>

<Tooltip.Provider>
  <Tooltip content="Add">
    {#snippet render({ props })}
      <Button {...props} shape="square" aria-label="Add">
        <PlusIcon class="size-4" />
      </Button>
    {/snippet}
  </Tooltip>
</Tooltip.Provider>
