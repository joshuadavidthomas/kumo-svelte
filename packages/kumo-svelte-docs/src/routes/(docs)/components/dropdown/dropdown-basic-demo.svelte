<script lang="ts">
  import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "kumo-svelte";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet child({ props })}
      <Button {...props} icon={PlusIcon}>Add</Button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Worker</DropdownMenuItem>
    <DropdownMenuItem>Pages</DropdownMenuItem>
    <DropdownMenuItem>KV Namespace</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
