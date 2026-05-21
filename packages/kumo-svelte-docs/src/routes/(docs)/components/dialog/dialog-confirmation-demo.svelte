<script lang="ts">
  import { Button, Dialog, DialogClose, DialogDescription, DialogRoot, DialogTitle, DialogTrigger } from "kumo-svelte";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
</script>

<DialogRoot disablePointerDismissal>
  <DialogTrigger>
    {#snippet child({ props })}
      <Button {...props} variant="destructive">Delete Project</Button>
    {/snippet}
  </DialogTrigger>
  <Dialog class="p-8">
    <div class="mb-4 flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-kumo-danger/20">
        <WarningIcon size={20} class="text-kumo-danger" />
      </div>
      <DialogTitle class="text-xl font-semibold">Delete Project?</DialogTitle>
    </div>
    <DialogDescription class="text-kumo-subtle">
      This action cannot be undone. This will permanently delete the project and all associated data.
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
