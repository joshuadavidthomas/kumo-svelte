<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    tableOfContentsItemVariants,
    TABLE_OF_CONTENTS_NESTED_LIST_CLASSES,
  } from "./variants";

  export interface TableOfContentsGroupProps
    extends Omit<HTMLAttributes<HTMLLIElement>, "class" | "children" | "title"> {
    active?: boolean;
    children?: Snippet;
    class?: string;
    href?: string;
    label: string;
  }

  let {
    active = false,
    children,
    class: className,
    href,
    label,
    ...restProps
  }: TableOfContentsGroupProps = $props();
</script>

<li
  data-slot="table-of-contents-group"
  class={cn("-ml-0.5 flex flex-col gap-2", className)}
  {...restProps}
>
  {#if href}
    <a
      {href}
      aria-current={active ? "true" : undefined}
      class={tableOfContentsItemVariants(active)}
    >
      <span class="block min-w-0 leading-5">{label}</span>
    </a>
  {:else}
    <p class="py-0.5 pl-4 text-sm leading-5 font-medium text-kumo-subtle">{label}</p>
  {/if}
  <ul class={TABLE_OF_CONTENTS_NESTED_LIST_CLASSES}>
    {@render children?.()}
  </ul>
</li>
