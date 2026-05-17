<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    KUMO_LINK_DEFAULT_VARIANTS,
    linkVariants,
    type KumoLinkVariant,
  } from "./variants";

  export interface LinkProps
    extends Omit<HTMLAnchorAttributes, "class" | "children"> {
    variant?: KumoLinkVariant;
    class?: string;
    children: Snippet;
  }

  let {
    class: className,
    variant = KUMO_LINK_DEFAULT_VARIANTS.variant,
    children,
    ...restProps
  }: LinkProps = $props();
</script>

<a
  class={cn(
    linkVariants({ variant }),
    "group/link inline-flex items-center gap-[0.1875em]",
    className,
  )}
  {...restProps}
>
  {@render children()}
</a>
