<script lang="ts">
  import { Button, Popover } from "kumo-svelte";
</script>

<Popover>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button {...props}>Open Popover</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Popover Title</Popover.Title>
    <Popover.Description>This is a popover.</Popover.Description>
  </Popover.Content>
</Popover>
