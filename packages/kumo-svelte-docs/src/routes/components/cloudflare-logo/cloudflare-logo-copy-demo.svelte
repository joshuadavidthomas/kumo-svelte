<script lang="ts">
  import {
    Button,
    CloudflareLogo,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    generateCloudflareLogoSvg,
  } from "kumo-svelte";
  import ArrowSquareOutIcon from "phosphor-svelte/lib/ArrowSquareOutIcon";
  import CloudIcon from "phosphor-svelte/lib/CloudIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DownloadSimpleIcon from "phosphor-svelte/lib/DownloadSimpleIcon";

  let copied = $state<string | null>(null);

  function resetCopiedSoon() {
    setTimeout(() => {
      copied = null;
    }, 2000);
  }

  async function copyToClipboard(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    copied = label;
    resetCopiedSoon();
  }

  function openExternal(url: string) {
    window.open(url, "_blank", "noopener");
  }
</script>

{#snippet cloudIcon()}
  <CloudIcon />
{/snippet}

{#snippet codeIcon()}
  <CodeIcon />
{/snippet}

{#snippet downloadIcon()}
  <DownloadSimpleIcon />
{/snippet}

{#snippet externalIcon()}
  <ArrowSquareOutIcon />
{/snippet}

<div class="flex items-center gap-4">
  <DropdownMenu>
    <DropdownMenuTrigger>
      {#snippet child({ props })}
        <Button {...props} class="bg-black px-4 py-3 text-white hover:opacity-80">
          <CloudflareLogo variant="glyph" color="white" class="w-8" />
          <span class="font-medium">Logo</span>
        </Button>
      {/snippet}
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        icon={cloudIcon}
        onclick={() =>
          copyToClipboard(generateCloudflareLogoSvg({ variant: "glyph" }), "glyph")}
      >
        {copied === "glyph" ? "Copied!" : "Copy logo as SVG"}
      </DropdownMenuItem>
      <DropdownMenuItem
        icon={codeIcon}
        onclick={() => copyToClipboard(generateCloudflareLogoSvg({ variant: "full" }), "full")}
      >
        {copied === "full" ? "Copied!" : "Copy full logo as SVG"}
      </DropdownMenuItem>
      <DropdownMenuItem
        icon={downloadIcon}
        onclick={() => openExternal("https://www.cloudflare.com/press-kit/")}
      >
        Download brand assets
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        icon={externalIcon}
        onclick={() => openExternal("https://www.cloudflare.com/brand-assets/")}
      >
        Visit brand guidelines
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <span class="text-sm text-kumo-subtle">Click to open the brand assets menu</span>
</div>
