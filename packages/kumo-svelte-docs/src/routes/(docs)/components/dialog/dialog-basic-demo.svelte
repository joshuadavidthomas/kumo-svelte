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
      <Button {...props}>Click me</Button>
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
  </Dialog>
</DialogRoot>
