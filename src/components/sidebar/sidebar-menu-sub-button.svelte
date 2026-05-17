<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { isInsideSidebarMenuSubItem } from "./context.svelte";

  export interface SidebarMenuSubButtonProps
    extends Omit<HTMLButtonAttributes, "children" | "class" | "type"> {
    active?: boolean;
    children?: Snippet;
    class?: string;
    href?: string;
    linkProps?: Omit<HTMLAnchorAttributes, "children" | "class" | "href">;
  }

  let {
    active = false,
    children,
    class: className,
    href,
    linkProps,
    ...restProps
  }: SidebarMenuSubButtonProps = $props();

  const insideMenuSubItem = isInsideSidebarMenuSubItem();

  let buttonClasses = $derived(
    cn(
      "flex min-h-[34px] w-full min-w-0 items-center gap-2 rounded-lg px-3 py-1 text-sm font-medium",
      "text-kumo-default transition-colors duration-150",
      !active && "hover:bg-kumo-tint",
      active && "bg-kumo-tint",
      "focus-visible:ring-2 focus-visible:ring-kumo-brand",
      className,
    ),
  );
</script>

{#snippet Content()}
  <span class="flex-1 truncate text-left">{@render children?.()}</span>
{/snippet}

{#snippet Button()}
  {#if href}
    <a
      href={href}
      data-active={active || undefined}
      data-sidebar="menu-sub-button"
      class={cn(buttonClasses, "no-underline!")}
      {...linkProps}
    >
      {@render Content()}
    </a>
  {:else}
    <button
      type="button"
      class={buttonClasses}
      data-active={active || undefined}
      data-sidebar="menu-sub-button"
      {...restProps}
    >
      {@render Content()}
    </button>
  {/if}
{/snippet}

{#if insideMenuSubItem}
  {@render Button()}
{:else}
  <li data-sidebar="menu-sub-item" class="relative">
    {@render Button()}
  </li>
{/if}
