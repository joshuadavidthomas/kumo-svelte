<script lang="ts">
  import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuLinkItem, DropdownMenuSeparator, DropdownMenuTrigger } from "kumo-svelte";
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
  <DropdownMenuTrigger>
    {#snippet child({ props })}
      <Button {...props} variant="secondary">Resources</Button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLinkItem href="/settings" icon={gearIcon}>Settings</DropdownMenuLinkItem>
    <DropdownMenuLinkItem href="/docs" icon={bookIcon}>Documentation</DropdownMenuLinkItem>
    <DropdownMenuSeparator />
    <DropdownMenuLinkItem href="https://developers.cloudflare.com" target="_blank" icon={externalIcon}>
      Cloudflare Docs
    </DropdownMenuLinkItem>
  </DropdownMenuContent>
</DropdownMenu>
