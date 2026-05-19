<script lang="ts">
  import { Button, Dialog, DialogClose, DialogDescription, DialogFooter, DialogRoot, DialogTitle } from "kumo-svelte";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";

  let open = $state(false);
</script>

<Button variant="destructive" onclick={() => (open = true)}>Delete Account</Button>

<DialogRoot bind:open role="alertdialog">
  <Dialog class="p-8">
    <div class="mb-4 flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-kumo-danger/20">
        <WarningIcon size={20} weight="fill" class="text-kumo-danger" />
      </div>
      <DialogTitle>Delete Account?</DialogTitle>
    </div>
    <DialogDescription class="text-kumo-subtle">
      This action cannot be undone. All your data will be permanently removed from our servers.
    </DialogDescription>
    <DialogFooter class="mt-8">
      <DialogClose class="rounded-md border border-kumo-line px-3 py-2 text-sm hover:bg-kumo-hover">Cancel</DialogClose>
      <DialogClose class="rounded-md bg-kumo-danger px-3 py-2 text-sm text-white hover:opacity-90">Delete Account</DialogClose>
    </DialogFooter>
  </Dialog>
</DialogRoot>
