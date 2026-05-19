<script lang="ts">
  import { Button, Dialog, DialogClose, DialogDescription, DialogHeader, DialogRoot, DialogTitle } from "kumo-svelte";
  import XIcon from "phosphor-svelte/lib/XIcon";

  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Click me</Button>

<DialogRoot bind:open>
  <Dialog class="p-8">
    <DialogHeader class="mb-4 flex-row items-start justify-between gap-4">
      <DialogTitle class="text-2xl">Modal Title</DialogTitle>
      <DialogClose class="rounded-md border border-kumo-line p-2 text-kumo-subtle hover:bg-kumo-hover">
        <XIcon size={16} />
      </DialogClose>
    </DialogHeader>
    <DialogDescription class="text-kumo-subtle">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </DialogDescription>
  </Dialog>
</DialogRoot>
