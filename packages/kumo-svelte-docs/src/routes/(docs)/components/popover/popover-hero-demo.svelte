<script lang="ts">
  import BellIcon from "phosphor-svelte/lib/BellIcon";
  import { Button, Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "kumo-svelte";
</script>

<Popover>
  <PopoverTrigger>
    {#snippet child({ props })}
      <Button {...props} shape="square" icon={BellIcon} aria-label="Notifications" />
    {/snippet}
  </PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Notifications</PopoverTitle>
    <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
  </PopoverContent>
</Popover>
