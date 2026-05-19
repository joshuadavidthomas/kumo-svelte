<script lang="ts">
  import { Button, Popover, PopoverClose, PopoverContent, PopoverTitle, PopoverTrigger } from "kumo-svelte";
</script>

<Popover>
  <PopoverTrigger>
    {#snippet child({ props })}
      <Button {...props}>User Profile</Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverContent class="w-64">
    <div class="flex items-center gap-3">
      <div class="size-10 rounded-full bg-kumo-recessed"></div>
      <div>
        <PopoverTitle>Jane Doe</PopoverTitle>
        <p class="text-sm text-kumo-subtle">jane@example.com</p>
      </div>
    </div>
    <div class="mt-3 flex gap-2 border-t border-kumo-hairline pt-3">
      <Button variant="secondary" size="sm" class="flex-1">Profile</Button>
      <PopoverClose>
        {#snippet child({ props })}
          <Button {...props} variant="ghost" size="sm" class="flex-1">Sign Out</Button>
        {/snippet}
      </PopoverClose>
    </div>
  </PopoverContent>
</Popover>
