<script lang="ts">
  import { Button, DropdownMenu } from "kumo-svelte";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} icon={PlusIcon}>Add</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Worker</DropdownMenu.Item>
    <DropdownMenu.Item>Pages</DropdownMenu.Item>
    <DropdownMenu.Item>KV Namespace</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
