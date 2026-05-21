<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "kumo-svelte";
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
  </DropdownMenuContent>
</DropdownMenu>
