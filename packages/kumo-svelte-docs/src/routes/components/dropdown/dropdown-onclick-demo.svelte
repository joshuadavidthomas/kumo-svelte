<script lang="ts">
  import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "kumo-svelte";
  import CopyIcon from "phosphor-svelte/lib/CopyIcon";
  import PencilSimpleIcon from "phosphor-svelte/lib/PencilSimpleIcon";
  import TrashIcon from "phosphor-svelte/lib/TrashIcon";

  let lastAction = $state<string | null>(null);
</script>

{#snippet copyIcon()}
  <CopyIcon size={16} />
{/snippet}

{#snippet pencilIcon()}
  <PencilSimpleIcon size={16} />
{/snippet}

{#snippet trashIcon()}
  <TrashIcon size={16} />
{/snippet}

<div class="flex flex-col items-start gap-2">
  <DropdownMenu>
    <DropdownMenuTrigger>
      {#snippet child({ props })}
        <Button {...props}>Actions</Button>
      {/snippet}
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem icon={copyIcon} onclick={() => (lastAction = "Duplicated")}>Duplicate</DropdownMenuItem>
      <DropdownMenuItem icon={pencilIcon} onclick={() => (lastAction = "Renamed")}>Rename</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={trashIcon} variant="danger" onclick={() => (lastAction = "Deleted")}>Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  {#if lastAction}
    <p class="text-sm text-kumo-subtle">Last action: <span class="text-kumo-default">{lastAction}</span></p>
  {/if}
</div>
