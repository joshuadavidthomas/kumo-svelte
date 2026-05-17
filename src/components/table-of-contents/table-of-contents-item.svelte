<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { tableOfContentsItemVariants } from "./variants";

  type ItemProps = Omit<HTMLAnchorAttributes, "class" | "children"> &
    Omit<HTMLButtonAttributes, "class" | "children">;

  export interface TableOfContentsItemProps extends ItemProps {
    active?: boolean;
    child?: Snippet<[{ props: ItemProps & { class: string } }]>;
    children?: Snippet;
    class?: string;
  }

  let {
    active = false,
    child,
    children,
    class: className,
    ...restProps
  }: TableOfContentsItemProps = $props();

  let itemProps = $derived({
    "aria-current": active ? true : undefined,
    class: cn(tableOfContentsItemVariants(active), className),
    ...restProps,
  });
</script>

<li data-slot="table-of-contents-item" class="-ml-0.5">
  {#if child}
    {@render child({ props: itemProps })}
  {:else}
    <a {...itemProps}>
      <span class="block min-w-0 leading-5">
        {@render children?.()}
      </span>
    </a>
  {/if}
</li>
