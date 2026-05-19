<script lang="ts">
  import { Button, Dialog, DialogDescription, DialogRoot, DialogTitle, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "kumo-svelte";

  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Menu Dialog</Button>

<DialogRoot bind:open>
  <Dialog class="p-8">
    <DialogTitle class="mb-2 text-2xl">More actions</DialogTitle>
    <DialogDescription class="mb-4 text-kumo-subtle">Dropdown menus can be rendered inside dialogs.</DialogDescription>
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">Actions</Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Archive</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Dialog>
</DialogRoot>
