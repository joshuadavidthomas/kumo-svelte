<script lang="ts">
  import { DropdownMenu } from "kumo-svelte";
  import GearIcon from "phosphor-svelte/lib/GearIcon";
  import SignOutIcon from "phosphor-svelte/lib/SignOutIcon";
  import UserIcon from "phosphor-svelte/lib/UserIcon";
</script>

{#snippet userIcon()}
  <UserIcon size={16} />
{/snippet}

{#snippet gearIcon()}
  <GearIcon size={16} />
{/snippet}

{#snippet signOutIcon()}
  <SignOutIcon size={16} />
{/snippet}

<DropdownMenu>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <button {...props} type="button" class="rounded-full">
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-kumo-brand text-sm font-medium text-white">
          MR
        </span>
      </button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item icon={userIcon}>Profile</DropdownMenu.Item>
    <DropdownMenu.Item icon={gearIcon}>Settings</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item icon={signOutIcon} variant="danger">Log out</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
