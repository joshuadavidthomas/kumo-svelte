<script lang="ts">
  import { onDestroy, type Snippet } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon.svelte";
  import CopyIcon from "phosphor-svelte/lib/CopyIcon.svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import Button from "../button/button.svelte";
  import { emptyVariants, KUMO_EMPTY_DEFAULT_VARIANTS, type KumoEmptySize } from "./variants";

  export interface EmptyProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
    commandLine?: string;
    contents?: Snippet;
    description?: string;
    icon?: Snippet;
    size?: KumoEmptySize;
    title: string;
  }

  let {
    children,
    class: className,
    commandLine,
    contents,
    description,
    icon,
    size = KUMO_EMPTY_DEFAULT_VARIANTS.size,
    title,
    ...restProps
  }: EmptyProps = $props();

  let copied = $state(false);
  let copyTimeout: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => {
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
  });

  async function copyCommand() {
    if (!commandLine || typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(commandLine);
    copied = true;

    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }

    copyTimeout = setTimeout(() => {
      copied = false;
    }, 1000);
  }
</script>

<div class={cn(emptyVariants({ size }), className)} {...restProps}>
  {#if icon}
    {@render icon()}
  {/if}

  <h2 class="text-2xl font-semibold">{title}</h2>

  {#if description}
    <p class="max-w-140 text-center text-kumo-subtle">{description}</p>
  {/if}

  {#if commandLine}
    <div
      class={cn(
        "group/cmd relative inline-flex h-10 max-w-8/10 transform-gpu items-center gap-2 rounded-lg font-mono shadow-sm",
        "bg-kumo-overlay pr-2 pl-3",
        "transition-all duration-300 hover:border-kumo-interact/80 hover:shadow-md",
        "border border-kumo-fill/60",
      )}
    >
      <span class="text-xs text-kumo-inactive select-none">$</span>
      <span class="no-scrollbar overflow-scroll text-base whitespace-nowrap text-kumo-brand">
        {commandLine}
      </span>
      <Button
        class="group"
        size="sm"
        variant="ghost"
        shape="square"
        aria-label="Copy command"
        onclick={copyCommand}
      >
        {#if copied}
          <CheckIcon aria-hidden="true" size={16} weight="bold" class="animate-bounce-in text-kumo-success" />
        {:else}
          <CopyIcon aria-hidden="true" size={16} class="text-kumo-inactive group-hover:text-kumo-brand" />
        {/if}
      </Button>
    </div>
  {/if}

  {#if contents}
    {@render contents()}
  {:else if children}
    {@render children()}
  {/if}
</div>
