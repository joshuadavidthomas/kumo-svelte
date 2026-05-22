<script lang="ts">
  import { Button, Dialog } from "kumo-svelte";
  import XIcon from "phosphor-svelte/lib/XIcon";
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button {...props}>Delete</Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog class="p-8">
    <div class="mb-4 flex items-start justify-between gap-4">
      <Dialog.Title class="text-2xl font-semibold">Modal Title</Dialog.Title>
      <Dialog.Close aria-label="Close">
        {#snippet child({ props })}
          <Button {...props} variant="secondary" shape="square" icon={XIcon} aria-label="Close" />
        {/snippet}
      </Dialog.Close>
    </div>
    <Dialog.Description class="text-kumo-subtle">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </Dialog.Description>
    <div class="mt-8 flex justify-end gap-2">
      <Dialog.Close>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">Cancel</Button>
        {/snippet}
      </Dialog.Close>
      <Dialog.Close>
        {#snippet child({ props })}
          <Button {...props} variant="destructive">Delete</Button>
        {/snippet}
      </Dialog.Close>
    </div>
  </Dialog>
</Dialog.Root>
