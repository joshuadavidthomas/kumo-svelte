<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { tableOfContentsItemVariants } from "./variants";

  type ItemProps = Omit<HTMLAnchorAttributes, "class" | "children">;

  export interface TableOfContentsItemProps extends ItemProps {
    active?: boolean;
    child?: Snippet<[{ props: Record<string, unknown> & { class: string } }]>;
    children?: Snippet;
    class?: string;
    onclick?: (event: MouseEvent) => void;
  }

  let {
    active = false,
    child,
    children,
    class: className,
    onclick,
    ...restProps
  }: TableOfContentsItemProps = $props();

  let itemProps = $derived({
    "aria-current": active ? ("true" as const) : undefined,
    class: cn(tableOfContentsItemVariants(active), className),
    ...restProps,
  });
</script>

<li data-slot="table-of-contents-item" class="-ml-0.5">
  {#if child}
    {@render child({ props: itemProps })}
  {:else}
    <a {...itemProps} {onclick}>
      <span class="block min-w-0 leading-5">
        {@render children?.()}
      </span>
    </a>
  {/if}
</li>
