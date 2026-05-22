<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import * as Tooltip from "kumo-svelte/components/tooltip";
</script>

<Tooltip.Provider>
  <div class="flex gap-4">
    <Tooltip.Root content="Opens after 1 second" delay={1000}>
      {#snippet render({ props })}
        <Button {...props} variant="secondary">1s open delay</Button>
      {/snippet}
    </Tooltip.Root>
    <Tooltip.Root content="Stays open 500ms after leaving" closeDelay={500}>
      {#snippet render({ props })}
        <Button {...props} variant="secondary">500ms close delay</Button>
      {/snippet}
    </Tooltip.Root>
    <Tooltip.Root content="Instant open, stays 1s" delay={0} closeDelay={1000}>
      {#snippet render({ props })}
        <Button {...props} variant="secondary">Instant + 1s close</Button>
      {/snippet}
    </Tooltip.Root>
  </div>
</Tooltip.Provider>
