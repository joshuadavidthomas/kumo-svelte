<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import { Button, Tooltip } from "kumo-svelte";
</script>

<Tooltip.Provider>
  <Tooltip content="Add new item">
    {#snippet render({ props })}
      <Button {...props} shape="square" aria-label="Add new item">
        <PlusIcon class="size-4" />
      </Button>
    {/snippet}
  </Tooltip>
</Tooltip.Provider>
