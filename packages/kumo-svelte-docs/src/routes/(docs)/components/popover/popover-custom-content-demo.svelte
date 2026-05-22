<script lang="ts">
  import { Button } from "kumo-svelte";
  import * as Popover from "kumo-svelte/components/popover";
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button {...props}>User Profile</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-64">
    <div class="flex items-center gap-3">
      <div class="size-10 rounded-full bg-kumo-recessed"></div>
      <div>
        <Popover.Title>Jane Doe</Popover.Title>
        <p class="text-sm text-kumo-subtle">jane@example.com</p>
      </div>
    </div>
    <div class="mt-3 flex gap-2 border-t border-kumo-hairline pt-3">
      <Button variant="secondary" size="sm" class="flex-1">Profile</Button>
      <Popover.Close>
        {#snippet child({ props })}
          <Button {...props} variant="ghost" size="sm" class="flex-1">Sign Out</Button>
        {/snippet}
      </Popover.Close>
    </div>
  </Popover.Content>
</Popover.Root>
