<script lang="ts">
  import { CloudflareLogo, DropdownMenu, generateCloudflareLogoSvg } from "kumo-svelte";
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
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <button
          {...props}
          type="button"
          class="flex items-center gap-2 rounded-lg bg-black px-4 py-3 text-white transition-opacity hover:opacity-80"
        >
          <CloudflareLogo variant="glyph" color="white" class="w-8" />
          <span class="font-medium">Logo</span>
        </button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item
        icon={cloudIcon}
        onclick={() =>
          copyToClipboard(generateCloudflareLogoSvg({ variant: "glyph" }), "glyph")}
      >
        {copied === "glyph" ? "Copied!" : "Copy logo as SVG"}
      </DropdownMenu.Item>
      <DropdownMenu.Item
        icon={codeIcon}
        onclick={() => copyToClipboard(generateCloudflareLogoSvg({ variant: "full" }), "full")}
      >
        {copied === "full" ? "Copied!" : "Copy full logo as SVG"}
      </DropdownMenu.Item>
      <DropdownMenu.Item
        icon={downloadIcon}
        onclick={() => openExternal("https://www.cloudflare.com/press-kit/")}
      >
        Download brand assets
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item
        icon={externalIcon}
        onclick={() => openExternal("https://www.cloudflare.com/brand-assets/")}
      >
        Visit brand guidelines
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu>

  <span class="text-sm text-kumo-subtle">Click to open the brand assets menu</span>
</div>
