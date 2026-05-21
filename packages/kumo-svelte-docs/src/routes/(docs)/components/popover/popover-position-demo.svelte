<script lang="ts">
  import { Button, Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "kumo-svelte";

  const sides = ["bottom", "top", "left", "right"] as const;
</script>

<div class="flex flex-wrap gap-4">
  {#each sides as side}
    <Popover>
      <PopoverTrigger>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">{side[0].toUpperCase() + side.slice(1)}</Button>
        {/snippet}
      </PopoverTrigger>
      <PopoverContent {side}>
        <PopoverTitle>{side[0].toUpperCase() + side.slice(1)}</PopoverTitle>
        <PopoverDescription>Popover on {side}.</PopoverDescription>
      </PopoverContent>
    </Popover>
  {/each}
</div>
