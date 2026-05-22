<script lang="ts">
  import { Button } from "kumo-svelte";
  import * as Dialog from "kumo-svelte/components/dialog";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
</script>

<Dialog.Root role="alertdialog">
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="destructive">Delete Account</Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content class="p-8">
    <div class="mb-4 flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-kumo-danger/20">
        <WarningIcon size={20} weight="fill" class="text-kumo-danger" />
      </div>
      <Dialog.Title class="text-xl font-semibold">Delete Account?</Dialog.Title>
    </div>
    <Dialog.Description class="text-kumo-subtle">
      This action cannot be undone. All your data will be permanently removed from our servers. Are you sure you want to
      proceed?
    </Dialog.Description>
    <div class="mt-8 flex justify-end gap-2">
      <Dialog.Close>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">Cancel</Button>
        {/snippet}
      </Dialog.Close>
      <Dialog.Close>
        {#snippet child({ props })}
          <Button {...props} variant="destructive">Delete Account</Button>
        {/snippet}
      </Dialog.Close>
    </div>
  </Dialog.Content>
</Dialog.Root>
