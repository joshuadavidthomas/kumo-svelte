<script lang="ts">
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon.svelte";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils";

  export interface SidebarInputProps
    extends Omit<HTMLButtonAttributes, "children" | "class" | "type"> {
    children?: Snippet;
    class?: string;
    placeholder?: string;
    shortcut?: string;
  }

  let {
    children,
    class: className,
    placeholder = "Search...",
    shortcut,
    ...restProps
  }: SidebarInputProps = $props();
</script>

<button
  type="button"
  data-sidebar="input"
  class={cn(
    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm",
    "bg-kumo-base text-kumo-subtle ring ring-kumo-hairline",
    "transition-[color,background-color,padding,box-shadow] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)]",
    "hover:bg-kumo-overlay focus-visible:ring-2 focus-visible:ring-kumo-brand",
    "group-data-[state=collapsed]/sidebar:px-2 group-data-[state=collapsed]/sidebar:ring-0",
    className,
  )}
  {...restProps}
>
  <MagnifyingGlassIcon class="size-4 shrink-0 text-kumo-subtle" />
  <span class="flex-1 truncate text-left group-data-[state=collapsed]/sidebar:hidden">
    {#if children}
      {@render children()}
    {:else}
      {placeholder}
    {/if}
  </span>
  {#if shortcut}
    <kbd class="ml-auto font-sans text-xs text-kumo-subtle group-data-[state=collapsed]/sidebar:hidden">
      {shortcut}
    </kbd>
  {/if}
</button>
