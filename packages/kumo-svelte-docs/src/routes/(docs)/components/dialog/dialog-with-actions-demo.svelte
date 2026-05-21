<script lang="ts">
  import {
    Button,
    Dialog,
    DialogClose,
    DialogDescription,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "kumo-svelte";
  import XIcon from "phosphor-svelte/lib/XIcon";
</script>

<DialogRoot>
  <DialogTrigger>
    {#snippet child({ props })}
      <Button {...props}>Delete</Button>
    {/snippet}
  </DialogTrigger>
  <Dialog class="p-8">
    <div class="mb-4 flex items-start justify-between gap-4">
      <DialogTitle class="text-2xl font-semibold">Modal Title</DialogTitle>
      <DialogClose aria-label="Close">
        {#snippet child({ props })}
          <Button {...props} variant="secondary" shape="square" icon={XIcon} aria-label="Close" />
        {/snippet}
      </DialogClose>
    </div>
    <DialogDescription class="text-kumo-subtle">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </DialogDescription>
    <div class="mt-8 flex justify-end gap-2">
      <DialogClose>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">Cancel</Button>
        {/snippet}
      </DialogClose>
      <DialogClose>
        {#snippet child({ props })}
          <Button {...props} variant="destructive">Delete</Button>
        {/snippet}
      </DialogClose>
    </div>
  </Dialog>
</DialogRoot>
