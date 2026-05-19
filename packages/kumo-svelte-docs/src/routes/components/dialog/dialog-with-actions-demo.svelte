<script lang="ts">
  import { Button, Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from "kumo-svelte";
  import XIcon from "phosphor-svelte/lib/XIcon";

  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Delete</Button>

<DialogRoot bind:open>
  <Dialog class="p-8">
    <DialogHeader class="mb-4 flex-row items-start justify-between gap-4">
      <DialogTitle class="text-2xl">Modal Title</DialogTitle>
      <DialogClose class="rounded-md border border-kumo-line p-2 text-kumo-subtle hover:bg-kumo-hover">
        <XIcon size={16} />
      </DialogClose>
    </DialogHeader>
    <DialogDescription class="text-kumo-subtle">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </DialogDescription>
    <DialogFooter class="mt-8">
      <DialogClose class="rounded-md border border-kumo-line px-3 py-2 text-sm hover:bg-kumo-hover">Cancel</DialogClose>
      <DialogClose class="rounded-md bg-kumo-danger px-3 py-2 text-sm text-white hover:opacity-90">Delete</DialogClose>
    </DialogFooter>
  </Dialog>
</DialogRoot>
