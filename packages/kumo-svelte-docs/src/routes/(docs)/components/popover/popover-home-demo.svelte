<script lang="ts">
  import { Button, Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "kumo-svelte";
</script>

<Popover>
  <PopoverTrigger>
    {#snippet child({ props })}
      <Button {...props}>Open Popover</Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Popover Title</PopoverTitle>
    <PopoverDescription>This is a popover.</PopoverDescription>
  </PopoverContent>
</Popover>
