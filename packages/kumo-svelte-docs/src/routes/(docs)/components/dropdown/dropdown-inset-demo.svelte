<script lang="ts">
  import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "kumo-svelte";
  import CopyIcon from "phosphor-svelte/lib/CopyIcon";
  import PencilSimpleIcon from "phosphor-svelte/lib/PencilSimpleIcon";
  import TrashIcon from "phosphor-svelte/lib/TrashIcon";
</script>

{#snippet pencilIcon()}
  <PencilSimpleIcon size={16} />
{/snippet}

{#snippet copyIcon()}
  <CopyIcon size={16} />
{/snippet}

{#snippet trashIcon()}
  <TrashIcon size={16} />
{/snippet}

<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet child({ props })}
      <Button {...props}>Edit</Button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem icon={pencilIcon}>Rename</DropdownMenuItem>
    <DropdownMenuItem icon={copyIcon}>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem inset>Move to folder</DropdownMenuItem>
    <DropdownMenuItem inset>Add to favorites</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={trashIcon} variant="danger">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
