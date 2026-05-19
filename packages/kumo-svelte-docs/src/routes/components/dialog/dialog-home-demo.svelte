<script lang="ts">
  import { Button, Dialog, DialogDescription, DialogRoot, DialogTitle } from "kumo-svelte";

  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Click me!</Button>
<DialogRoot bind:open>
  <Dialog class="p-8">
    <DialogTitle>Hello!</DialogTitle>
    <DialogDescription>I'm a dialog.</DialogDescription>
  </Dialog>
</DialogRoot>
