<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { getAutocompleteContext } from "./context";

  export interface AutocompleteEmptyProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
    ...restProps
  }: AutocompleteEmptyProps = $props();

  const context = getAutocompleteContext("Empty");
</script>

{#if !context.hasVisibleItems}
  <div
    data-slot="autocomplete-empty"
    class={cn("px-3 py-2 text-sm text-kumo-subtle", className)}
    {...restProps}
  >
    {#if children}
      {@render children()}
    {:else}
      No results found.
    {/if}
  </div>
{/if}
