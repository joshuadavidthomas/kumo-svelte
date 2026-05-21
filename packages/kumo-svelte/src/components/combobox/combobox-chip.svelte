<script lang="ts">
  import XIcon from "phosphor-svelte/lib/XIcon";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { getComboboxContext } from "./context";

  export interface ComboboxChipProps
    extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
    removeLabel?: string;
    value: string;
  }

  let {
    children,
    class: className,
    removeLabel = "Remove",
    value,
    ...restProps
  }: ComboboxChipProps = $props();

  const context = getComboboxContext("Chip");

  function handleRemove(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    context.removeValue(value);
  }
</script>

<span
  data-slot="combobox-chip"
  class={cn(
    "flex h-6 items-center gap-2.5 rounded-sm bg-kumo-overlay pr-[3px] pl-2 text-sm ring-1 ring-kumo-hairline",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <button
    type="button"
    aria-label={removeLabel}
    class="flex cursor-pointer rounded-md bg-transparent p-1 hover:bg-kumo-fill-hover"
    onclick={handleRemove}
  >
    <XIcon aria-hidden="true" size={10} />
  </button>
</span>
