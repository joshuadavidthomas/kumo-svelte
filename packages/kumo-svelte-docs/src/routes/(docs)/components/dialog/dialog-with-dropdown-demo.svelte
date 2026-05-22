<script lang="ts">
  import { Button, Dialog, DropdownMenu } from "kumo-svelte";
  import XIcon from "phosphor-svelte/lib/XIcon";
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button {...props}>Open Form</Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog class="p-8">
    <div class="mb-4 flex items-start justify-between gap-4">
      <Dialog.Title class="text-2xl font-semibold">Resource Actions</Dialog.Title>
      <Dialog.Close aria-label="Close">
        {#snippet child({ props })}
          <Button {...props} variant="secondary" shape="square" icon={XIcon} aria-label="Close" />
        {/snippet}
      </Dialog.Close>
    </div>
    <Dialog.Description class="mb-4 text-kumo-subtle">Choose an action for the selected resource.</Dialog.Description>
    <DropdownMenu>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button {...props}>Actions</Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="danger">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
    <div class="mt-8 flex justify-end">
      <Dialog.Close>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">Close</Button>
        {/snippet}
      </Dialog.Close>
    </div>
  </Dialog>
</Dialog.Root>
