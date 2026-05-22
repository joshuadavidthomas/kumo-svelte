<script lang="ts">
  import { Button, Dialog } from "kumo-svelte";
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button {...props}>Click me!</Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog>
    <Dialog.Title>Hello!</Dialog.Title>
    <Dialog.Description>I'm a dialog.</Dialog.Description>
  </Dialog>
</Dialog.Root>
