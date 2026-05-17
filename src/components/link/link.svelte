<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { getKumoLinkContext } from "../../utils/link-context.svelte";
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
    to?: string;
  }

  let {
    class: className,
    variant = KUMO_LINK_DEFAULT_VARIANTS.variant,
    children,
    to,
    ...restProps
  }: LinkProps = $props();

  const linkContext = getKumoLinkContext();
  let linkClass = $derived(
    cn(
      linkVariants({ variant }),
      "group/link inline-flex items-center gap-[0.1875em]",
      className,
    ),
  );
  let href = $derived(restProps.href ?? to);
</script>

{#if linkContext.component}
  {@const LinkComponent = linkContext.component}
  <LinkComponent {...restProps} {href} to={to ?? href} class={linkClass}>
    {@render children()}
  </LinkComponent>
{:else}
  <a class={linkClass} {...restProps} {href}>
    {@render children()}
  </a>
{/if}
