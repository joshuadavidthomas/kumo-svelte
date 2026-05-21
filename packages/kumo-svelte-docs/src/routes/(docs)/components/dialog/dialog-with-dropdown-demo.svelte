<script lang="ts">
  import {
    Button,
    Dialog,
    DialogClose,
    DialogDescription,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "kumo-svelte";
  import XIcon from "phosphor-svelte/lib/XIcon";
</script>

<DialogRoot>
  <DialogTrigger>
    {#snippet child({ props })}
      <Button {...props}>Open Form</Button>
    {/snippet}
  </DialogTrigger>
  <Dialog class="p-8">
    <div class="mb-4 flex items-start justify-between gap-4">
      <DialogTitle class="text-2xl font-semibold">Resource Actions</DialogTitle>
      <DialogClose aria-label="Close">
        {#snippet child({ props })}
          <Button {...props} variant="secondary" shape="square" icon={XIcon} aria-label="Close" />
        {/snippet}
      </DialogClose>
    </div>
    <DialogDescription class="mb-4 text-kumo-subtle">Choose an action for the selected resource.</DialogDescription>
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet child({ props })}
          <Button {...props}>Actions</Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <div class="mt-8 flex justify-end">
      <DialogClose>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">Close</Button>
        {/snippet}
      </DialogClose>
    </div>
  </Dialog>
</DialogRoot>
