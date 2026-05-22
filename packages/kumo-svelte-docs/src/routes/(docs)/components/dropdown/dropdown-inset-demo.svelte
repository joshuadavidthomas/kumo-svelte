<script lang="ts">
  import { Button, DropdownMenu } from "kumo-svelte";
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
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props}>Edit</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item icon={pencilIcon}>Rename</DropdownMenu.Item>
    <DropdownMenu.Item icon={copyIcon}>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item inset>Move to folder</DropdownMenu.Item>
    <DropdownMenu.Item inset>Add to favorites</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item icon={trashIcon} variant="danger">Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
