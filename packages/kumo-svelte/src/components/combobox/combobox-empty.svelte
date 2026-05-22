<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { getComboboxContext } from "./context";

  export interface ComboboxEmptyProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
    ...restProps
  }: ComboboxEmptyProps = $props();

  const context = getComboboxContext("Empty");
</script>

{#if !context.hasVisibleItems}
  <div
    data-slot="combobox-empty"
    class={cn("mx-1.5 shrink-0 px-4 py-2 text-[0.925rem] leading-4 text-kumo-subtle", className)}
    {...restProps}
  >
    {#if children}
      {@render children()}
    {:else}
      No labels found.
    {/if}
  </div>
{/if}
