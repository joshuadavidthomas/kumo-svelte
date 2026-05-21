<script lang="ts">
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "kumo-svelte";
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
  <DropdownMenuTrigger>
    {#snippet child({ props })}
      <button {...props} type="button" class="rounded-full">
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-kumo-brand text-sm font-medium text-white">
          MR
        </span>
      </button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem icon={userIcon}>Profile</DropdownMenuItem>
    <DropdownMenuItem icon={gearIcon}>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={signOutIcon} variant="danger">Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
