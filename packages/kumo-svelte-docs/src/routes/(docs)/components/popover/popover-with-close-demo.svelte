<script lang="ts">
  import { Button, Popover, PopoverClose, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "kumo-svelte";
</script>

<Popover>
  <PopoverTrigger>
    {#snippet child({ props })}
      <Button {...props}>Open Settings</Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Settings</PopoverTitle>
    <PopoverDescription>Configure your preferences below.</PopoverDescription>
    <div class="mt-3">
      <PopoverClose>
        {#snippet child({ props })}
          <Button {...props} variant="secondary" size="sm">Close</Button>
        {/snippet}
      </PopoverClose>
    </div>
  </PopoverContent>
</Popover>
