<script lang="ts">
  import { Button } from "kumo-svelte";
  import * as Dialog from "kumo-svelte/components/dialog";
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button {...props}>Click me!</Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Hello!</Dialog.Title>
    <Dialog.Description>I'm a dialog.</Dialog.Description>
  </Dialog.Content>
</Dialog.Root>
