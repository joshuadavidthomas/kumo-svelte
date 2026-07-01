<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    bannerIconVariants,
    bannerVariants,
    KUMO_BANNER_DEFAULT_VARIANTS,
    type KumoBannerVariant,
  } from "./variants";

  export interface BannerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children" | "title"> {
    action?: Snippet;
    children?: Snippet;
    class?: string;
    description?: Snippet | string;
    icon?: Snippet;
    title?: string;
    variant?: KumoBannerVariant;
  }

  let {
    action,
    children,
    class: className,
    description,
    icon,
    title,
    variant = KUMO_BANNER_DEFAULT_VARIANTS.variant,
    ...restProps
  }: BannerProps = $props();

  let structured = $derived(Boolean(title || description));
</script>

<div class={cn(bannerVariants({ variant }), className)} {...restProps}>
  {#if icon}
    <span
      class={cn(
        "shrink-0",
        structured && "flex h-[1.375em] items-center",
        bannerIconVariants({ variant }),
      )}
    >
      {@render icon()}
    </span>
  {/if}

  {#if structured}
    <div class={cn("flex min-w-0 flex-1 items-center justify-between gap-3", !title && "pt-px")}>
      <div class="flex flex-col gap-0.5">
        {#if title}
          <p class="font-medium leading-snug">{title}</p>
        {/if}
        {#if description}
          <div class="text-sm leading-snug">
            {#if typeof description === "string"}
              <p>{description}</p>
            {:else}
              {@render description()}
            {/if}
          </div>
        {/if}
      </div>
      {#if action}
        <div class="flex shrink-0 items-center gap-2">
          {@render action()}
        </div>
      {/if}
    </div>
  {:else if children}
    <p>{@render children()}</p>
  {/if}
</div>
