<script lang="ts">
  import { Button, Dialog, DialogDescription, DialogRoot, DialogTitle, DialogTrigger } from "kumo-svelte";
</script>

<DialogRoot>
  <DialogTrigger>
    {#snippet child({ props })}
      <Button {...props}>Click me!</Button>
    {/snippet}
  </DialogTrigger>
  <Dialog>
    <DialogTitle>Hello!</DialogTitle>
    <DialogDescription>I'm a dialog.</DialogDescription>
  </Dialog>
</DialogRoot>
