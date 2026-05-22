<script lang="ts">
  import { Button, DropdownMenu } from "kumo-svelte";
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
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Button {...props}>Actions</Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item icon={copyIcon} onclick={() => (lastAction = "Duplicated")}>Duplicate</DropdownMenu.Item>
      <DropdownMenu.Item icon={pencilIcon} onclick={() => (lastAction = "Renamed")}>Rename</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item icon={trashIcon} variant="danger" onclick={() => (lastAction = "Deleted")}>Delete</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu>
  {#if lastAction}
    <p class="text-sm text-kumo-subtle">Last action: <span class="text-kumo-default">{lastAction}</span></p>
  {/if}
</div>
