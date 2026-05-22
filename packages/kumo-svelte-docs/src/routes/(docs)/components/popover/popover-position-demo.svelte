<script lang="ts">
  import { Button } from "kumo-svelte";
  import * as Popover from "kumo-svelte/components/popover";
  const sides = ["bottom", "top", "left", "right"] as const;
</script>

<div class="flex flex-wrap gap-4">
  {#each sides as side}
    <Popover.Root>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">{side[0].toUpperCase() + side.slice(1)}</Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content {side}>
        <Popover.Title>{side[0].toUpperCase() + side.slice(1)}</Popover.Title>
        <Popover.Description>Popover on {side}.</Popover.Description>
      </Popover.Content>
    </Popover.Root>
  {/each}
</div>
