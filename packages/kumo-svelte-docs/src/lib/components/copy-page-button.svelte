<script lang="ts">
  import ClaudeIcon from "$lib/components/claude-icon.svelte";
  import { onDestroy } from "svelte";
  import { Button } from "kumo-svelte/components/button";
  import * as DropdownMenu from "kumo-svelte/components/dropdown";
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon";
  import CopySimpleIcon from "phosphor-svelte/lib/CopySimpleIcon";
  import FileMdIcon from "phosphor-svelte/lib/FileMdIcon";
  import LinkSimpleIcon from "phosphor-svelte/lib/LinkSimpleIcon";
  import OpenAiLogoIcon from "phosphor-svelte/lib/OpenAiLogoIcon";

  interface Props {
    align?: "start" | "center" | "end";
  }

  let { align = "end" }: Props = $props();
  let copied = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => {
    if (resetTimer) clearTimeout(resetTimer);
  });

  function getMarkdownUrl() {
    const url = new URL(window.location.href);
    const path = url.pathname.replace(/\/+$/, "");

    return `${url.origin}${path}.md`;
  }

  function markCopied() {
    copied = true;
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copied = false;
    }, 2000);
  }

  async function handleCopyMarkdown() {
    markCopied();

    try {
      const response = await fetch(getMarkdownUrl());
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();

      await navigator.clipboard.writeText(markdown);
    } catch (error) {
      console.error("Failed to copy page as Markdown:", error);
    }
  }

  async function handleCopyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (error) {
      console.error("Failed to copy page link:", error);
    }
  }

  function handleViewMarkdown() {
    window.open(getMarkdownUrl(), "_blank");
  }

  function getAIPromptUrl(baseUrl: string) {
    const prompt = encodeURIComponent(
      `Read through this Kumo Svelte documentation: ${getMarkdownUrl()}. I'll need your help to understand it, so be prepared to explain concepts, share examples, and assist with debugging.`,
    );

    return `${baseUrl}?q=${prompt}`;
  }

  function handleOpenInClaude() {
    window.open(getAIPromptUrl("https://claude.ai/new"), "_blank");
  }

  function handleOpenInChatGPT() {
    window.open(getAIPromptUrl("https://chatgpt.com"), "_blank");
  }
</script>

{#snippet linkIcon()}
  <LinkSimpleIcon size={16} aria-hidden="true" />
{/snippet}

{#snippet fileMdIcon()}
  <FileMdIcon size={16} aria-hidden="true" />
{/snippet}

{#snippet claudeIcon()}
  <ClaudeIcon />
{/snippet}

{#snippet openAiIcon()}
  <OpenAiLogoIcon size={16} aria-hidden="true" />
{/snippet}

<div class="flex items-center" data-copy-ignore>
  <Button
    class="gap-1.5 rounded-r-none border-r-0"
    size="sm"
    variant="secondary"
    onclick={handleCopyMarkdown}
  >
    {#if copied}
      <CheckIcon size={16} aria-hidden="true" />
    {:else}
      <CopySimpleIcon size={16} aria-hidden="true" />
    {/if}
    <span>Copy page</span>
  </Button>

  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Button
          {...props}
          aria-label="Copy page options"
          class="rounded-l-none"
          shape="square"
          size="sm"
          variant="secondary"
        >
          <CaretDownIcon size={12} aria-hidden="true" />
        </Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content {align}>
      <DropdownMenu.Item icon={linkIcon} onclick={handleCopyPageLink}>Copy page link</DropdownMenu.Item>
      <DropdownMenu.Item icon={fileMdIcon} onclick={handleViewMarkdown}>View Page as Markdown</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item icon={claudeIcon} onclick={handleOpenInClaude}>Open in Claude</DropdownMenu.Item>
      <DropdownMenu.Item icon={openAiIcon} onclick={handleOpenInChatGPT}>Open in ChatGPT</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
