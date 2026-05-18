<script lang="ts">
  import { onDestroy } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon.svelte";
  import CopyIcon from "phosphor-svelte/lib/CopyIcon.svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import Button from "../button/button.svelte";
  import { inputVariants } from "../input";
  import TooltipContent from "../tooltip/tooltip-content.svelte";
  import TooltipRoot from "../tooltip/tooltip-root.svelte";
  import TooltipTrigger from "../tooltip/tooltip-trigger.svelte";
  import {
    clipboardTextButtonSize,
    clipboardTextVariants,
    KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS,
    type KumoClipboardTextSize,
  } from "./variants";

  export interface ClipboardTextTooltipConfig {
    text?: string;
    copiedText?: string;
    side?: "top" | "bottom" | "left" | "right";
  }

  export interface ClipboardTextLabels {
    copyAction?: string;
  }

  export interface ClipboardTextProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    labels?: ClipboardTextLabels;
    onCopy?: () => void;
    size?: KumoClipboardTextSize;
    text: string;
    textToCopy?: string;
    tooltip?: ClipboardTextTooltipConfig;
  }

  let {
    class: className,
    labels = {},
    onCopy,
    size = KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS.size,
    text,
    textToCopy,
    tooltip,
    ...restProps
  }: ClipboardTextProps = $props();

  let copied = $state(false);
  let resetTimeout: ReturnType<typeof setTimeout> | undefined;
  let buttonSize = $derived(clipboardTextButtonSize(size));
  let copyAction = $derived(labels.copyAction ?? "Copy to clipboard");
  let tooltipText = $derived(tooltip?.text ?? "Copy");
  let copiedText = $derived(tooltip?.copiedText ?? "Copied");
  let tooltipSide = $derived(tooltip?.side ?? "top");

  const iconClasses = {
    initial:
      "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 translate-y-full",
    animate: "flex items-center justify-center translate-y-0 opacity-100",
    end:
      "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 -translate-y-full",
  } as const;

  onDestroy(() => {
    if (resetTimeout) {
      clearTimeout(resetTimeout);
    }
  });

  function resetCopiedSoon() {
    if (resetTimeout) {
      clearTimeout(resetTimeout);
    }

    resetTimeout = setTimeout(() => {
      copied = false;
    }, 1500);
  }

  async function writeToClipboard(value: string) {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(value);
      return;
    }

    if (typeof document === "undefined") {
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);

    const selection = document.getSelection();
    const previousRange = selection?.rangeCount ? selection.getRangeAt(0) : null;

    textarea.select();

    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
      if (previousRange) {
        selection?.removeAllRanges();
        selection?.addRange(previousRange);
      }
    }
  }

  async function copyToClipboard() {
    try {
      await writeToClipboard(textToCopy ?? text);
      copied = true;
      resetCopiedSoon();
      onCopy?.();
    } catch (error) {
      console.warn("Clipboard copy failed", error);
    }
  }
</script>

{#snippet buttonIcon()}
  <span
    data-slot="clipboard-text-copied-icon"
    class={cn(
      "transition-all duration-200",
      copied ? iconClasses.animate : iconClasses.initial,
    )}
  >
    <CheckIcon aria-hidden="true" size={16} weight="bold" />
  </span>
  <span
    data-slot="clipboard-text-copy-icon"
    class={cn(
      "transition-all duration-200",
      copied ? iconClasses.end : iconClasses.animate,
    )}
  >
    <CopyIcon aria-hidden="true" size={16} />
  </span>
{/snippet}

{#snippet copyButton(props: Record<string, unknown> = {})}
  <Button
    {...props}
    data-slot="clipboard-text-button"
    size={buttonSize}
    variant="ghost"
    aria-label={copyAction}
    onclick={copyToClipboard}
    class={cn(
      "relative isolate overflow-hidden rounded-l-none rounded-r-[inherit] border-l! border-kumo-line! px-3 transition-all duration-200",
      "focus:ring-kumo-focus/50 focus:ring-inset",
      "focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:ring-inset",
    )}
  >
    {@render buttonIcon()}
  </Button>
{/snippet}

<div
  data-slot="clipboard-text"
  class={cn(
    inputVariants({ size: buttonSize }),
    clipboardTextVariants({ size }),
    className,
  )}
  {...restProps}
>
  <span data-slot="clipboard-text-value" class="grow truncate ps-4 pe-2">{text}</span>
  {#if tooltip}
    <TooltipRoot disableCloseOnTriggerClick>
      <TooltipTrigger>
        {#snippet child({ props })}
          {@render copyButton(props)}
        {/snippet}
      </TooltipTrigger>
      <TooltipContent
        side={tooltipSide}
        sideOffset={8}
        arrow={false}
        class={cn(
          "flex origin-[var(--transform-origin)] flex-col rounded-md bg-kumo-base px-3 py-1.5 font-sans text-xs text-kumo-default",
          "shadow-lg shadow-kumo-tip-shadow outline outline-kumo-fill",
        )}
      >
        {copied ? copiedText : tooltipText}
      </TooltipContent>
    </TooltipRoot>
  {:else}
    {@render copyButton()}
  {/if}
  <span data-slot="clipboard-text-status" class="sr-only" aria-live="polite">
    {copied ? copiedText : ""}
  </span>
</div>
