<script lang="ts">
  import { onDestroy } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon.svelte";
  import CopyIcon from "phosphor-svelte/lib/CopyIcon.svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import Button from "../button/button.svelte";

  export interface BreadcrumbsClipboardProps
    extends Omit<HTMLButtonAttributes, "class" | "children" | "onclick"> {
    class?: string;
    copiedLabel?: string;
    label?: string;
    onCopy?: () => void;
    text: string;
  }

  let {
    class: className,
    copiedLabel = "Copied",
    label = "Copy",
    onCopy,
    text,
    title = "Click to copy",
    ...restProps
  }: BreadcrumbsClipboardProps = $props();

  let copied = $state(false);
  let resetTimeout: ReturnType<typeof setTimeout> | undefined;
  let buttonTitle = $derived(title ?? undefined);

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
    }, 2000);
  }

  async function copyText() {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      copied = true;
      resetCopiedSoon();
      onCopy?.();
    } catch (error) {
      console.warn("Failed to copy deeplink", error);
    }
  }
</script>

<Button
  data-slot="breadcrumbs-clipboard"
  variant="ghost"
  shape="square"
  size="sm"
  class={cn("opacity-0 transition-[opacity] group-hover:opacity-100", className)}
  onclick={copyText}
  aria-label={label}
  title={buttonTitle}
  {...restProps}
>
  {#if copied}
    <CheckIcon aria-hidden="true" size={16} weight="bold" class="text-kumo-success" />
  {:else}
    <CopyIcon aria-hidden="true" size={16} />
  {/if}
  <span class="sr-only" aria-live="polite">{copied ? copiedLabel : ""}</span>
</Button>
