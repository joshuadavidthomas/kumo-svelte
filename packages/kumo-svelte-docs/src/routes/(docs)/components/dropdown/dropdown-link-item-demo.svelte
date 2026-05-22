<script lang="ts">
  import { Button, DropdownMenu } from "kumo-svelte";
  import ArrowSquareOutIcon from "phosphor-svelte/lib/ArrowSquareOutIcon";
  import BookOpenIcon from "phosphor-svelte/lib/BookOpenIcon";
  import GearIcon from "phosphor-svelte/lib/GearIcon";
</script>

{#snippet gearIcon()}
  <GearIcon size={16} />
{/snippet}

{#snippet bookIcon()}
  <BookOpenIcon size={16} />
{/snippet}

{#snippet externalIcon()}
  <ArrowSquareOutIcon size={16} />
{/snippet}

<DropdownMenu>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props}>Resources</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.LinkItem href="/settings" icon={gearIcon}>Settings</DropdownMenu.LinkItem>
    <DropdownMenu.LinkItem href="/docs" icon={bookIcon}>Documentation</DropdownMenu.LinkItem>
    <DropdownMenu.Separator />
    <DropdownMenu.LinkItem href="https://developers.cloudflare.com" target="_blank" icon={externalIcon}>
      Developer Docs
    </DropdownMenu.LinkItem>
  </DropdownMenu.Content>
</DropdownMenu>
