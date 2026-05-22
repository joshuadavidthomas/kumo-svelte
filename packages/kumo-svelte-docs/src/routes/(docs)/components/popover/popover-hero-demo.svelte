<script lang="ts">
  import BellIcon from "phosphor-svelte/lib/BellIcon";
  import { Button, Popover } from "kumo-svelte";
</script>

<Popover>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button {...props} shape="square" icon={BellIcon} aria-label="Notifications" />
    {/snippet}
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Notifications</Popover.Title>
    <Popover.Description>You are all caught up. Good job!</Popover.Description>
  </Popover.Content>
</Popover>
