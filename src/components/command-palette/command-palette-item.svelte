<script lang="ts">
  import type { Snippet } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon.svelte";
  import { Command as CommandPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface CommandPaletteItemProps {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    forceMount?: boolean;
    keywords?: string[];
    onSelect?: () => void;
    value?: string;
  }

  let {
    children,
    class: className,
    disabled = false,
    forceMount,
    keywords,
    onSelect,
    value,
  }: CommandPaletteItemProps = $props();
</script>

<CommandPrimitive.Item
  data-slot="command-palette-item"
  {disabled}
  {forceMount}
  {keywords}
  {onSelect}
  {value}
  class={cn(
    "group/command-item relative flex cursor-default items-center gap-3 rounded-lg px-2 py-1.5 text-left text-base outline-none select-none transition-colors",
    "data-[selected]:bg-kumo-overlay data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    className,
  )}
>
  {@render children?.()}
  <CheckIcon
    data-slot="command-palette-item-indicator"
    aria-hidden="true"
    class="ml-auto h-4 w-4 opacity-0 group-data-[checked=true]/command-item:opacity-100"
  />
</CommandPrimitive.Item>
