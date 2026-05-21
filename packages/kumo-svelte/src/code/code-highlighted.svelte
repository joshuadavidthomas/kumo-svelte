<script lang="ts">
  import { onDestroy } from "svelte";
  import Button from "../components/button/button.svelte";
  import { cn } from "../utils/cn";
  import { processHighlightedHtml } from "./shared";
  import type { CodeHighlightedProps } from "./types";
  import { useShikiHighlighter } from "./use-shiki-highlighter";

  let {
    class: className,
    code,
    highlightLines,
    labels: labelOverrides,
    lang,
    showCopyButton = false,
    showLineNumbers = false,
  }: CodeHighlightedProps = $props();

  const shiki = useShikiHighlighter();

  let copied = $state(false);
  let copyResetTimeout: number | undefined;
  let labels = $derived({
    ...shiki.labels,
    ...labelOverrides,
  });
  let html = $derived(shiki.highlight(code, lang));
  let lineCount = $derived(code.split("\n").length);
  let isSingleLine = $derived(lineCount === 1);
  let lineNumbers = $derived(
    Array.from({ length: lineCount }, (_, index) => index + 1),
  );
  let containerClasses = $derived(
    cn(
      "group relative m-0 w-full min-w-0 rounded-md border border-kumo-fill bg-kumo-base p-0",
      showCopyButton && isSingleLine && "flex items-center",
      className,
    ),
  );
  let processedHtml = $derived(
    html === null ? null : processHighlightedHtml(html, highlightLines),
  );

  onDestroy(() => {
    clearCopyReset();
  });

  function clearCopyReset() {
    if (!copyResetTimeout) return;

    clearTimeout(copyResetTimeout);
    copyResetTimeout = undefined;
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      clearCopyReset();
      copyResetTimeout = window.setTimeout(() => {
        copied = false;
        copyResetTimeout = undefined;
      }, 2000);
    } catch (error) {
      console.error("[Kumo CodeHighlighted] Failed to copy to clipboard:", error);
    }
  }
</script>

<div class={containerClasses}>
  {#if showLineNumbers && !isSingleLine}
    <div class="flex w-full">
      <div
        class="kumo-line-numbers shrink-0 select-none py-4 pr-4 text-right font-mono text-sm opacity-40"
        aria-hidden="true"
      >
        {#each lineNumbers as lineNumber (lineNumber)}
          <div class="leading-relaxed">{lineNumber}</div>
        {/each}
      </div>

      {#if shiki.isLoading || processedHtml === null}
        <pre
          class="!m-0 min-w-0 flex-1 overflow-x-auto !p-4 font-mono text-sm leading-relaxed text-kumo-subtle"
        ><code class="!m-0 !p-0">{code}</code></pre>
      {:else}
        <div class="min-w-0 flex-1 overflow-x-auto">
          <div
            class="kumo-shiki [&>pre]:!m-0 [&>pre]:!rounded-none [&>pre]:!border-0 [&>pre]:!bg-transparent [&>pre]:!p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed [&_code]:!m-0 [&_code]:!border-0 [&_code]:!bg-transparent [&_code]:!p-0"
          >
            <!-- Shiki escapes source code before returning highlighted HTML. -->
            {@html processedHtml}
          </div>
        </div>
      {/if}
    </div>
  {:else if shiki.isLoading || processedHtml === null}
    <pre
      class="!m-0 min-w-0 flex-1 overflow-x-auto !p-4 font-mono text-sm leading-relaxed text-kumo-subtle"
    ><code class="!m-0 !p-0">{code}</code></pre>
  {:else}
    <div class="overflow-x-auto">
      <div
        class="kumo-shiki [&>pre]:!m-0 [&>pre]:!rounded-none [&>pre]:!border-0 [&>pre]:!bg-transparent [&>pre]:!p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed [&_code]:!m-0 [&_code]:!border-0 [&_code]:!bg-transparent [&_code]:!p-0"
      >
        <!-- Shiki escapes source code before returning highlighted HTML. -->
        {@html processedHtml}
      </div>
    </div>
  {/if}

  {#if showCopyButton}
    <div
      class={cn(
        isSingleLine ? "shrink-0 px-2" : "absolute right-2 top-2",
        !copied && "opacity-0 transition-opacity group-hover:opacity-100",
      )}
    >
      <Button
        variant="secondary"
        size="sm"
        aria-label={copied ? labels.copied : labels.copy}
        onclick={handleCopy}
      >
        {copied ? labels.copied : labels.copy}
      </Button>
    </div>
  {/if}
</div>
