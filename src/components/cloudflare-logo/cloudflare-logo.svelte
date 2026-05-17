<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    CLOUDFLARE_FULL_LOGO_ORANGE_PATH,
    CLOUDFLARE_FULL_LOGO_VIEWBOX,
    CLOUDFLARE_FULL_LOGO_YELLOW_PATH,
    CLOUDFLARE_GLYPH_ORANGE_PATH,
    CLOUDFLARE_GLYPH_VIEWBOX,
    CLOUDFLARE_GLYPH_YELLOW_PATH,
    CLOUDFLARE_ORANGE,
    CLOUDFLARE_WORDMARK_PATHS,
    CLOUDFLARE_YELLOW,
  } from "./data";
  import {
    KUMO_CLOUDFLARE_LOGO_DEFAULT_VARIANTS,
    type CloudflareLogoColor,
    type CloudflareLogoVariant,
  } from "./variants";

  export interface CloudflareLogoProps extends Omit<SVGAttributes<SVGSVGElement>, "class"> {
    class?: string;
    color?: CloudflareLogoColor;
    variant?: CloudflareLogoVariant;
  }

  let {
    class: className,
    color = KUMO_CLOUDFLARE_LOGO_DEFAULT_VARIANTS.color,
    variant = KUMO_CLOUDFLARE_LOGO_DEFAULT_VARIANTS.variant,
    ...restProps
  }: CloudflareLogoProps = $props();

  let isGlyph = $derived(variant === "glyph");
  let fillOrange = $derived(color === "color" ? CLOUDFLARE_ORANGE : "currentColor");
  let fillYellow = $derived(color === "color" ? CLOUDFLARE_YELLOW : "currentColor");
</script>

{#if isGlyph}
  <svg
    viewBox={CLOUDFLARE_GLYPH_VIEWBOX}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Cloudflare logo"
    class={cn(color === "white" && "text-white", color === "black" && "text-black", className)}
    {...restProps}
  >
    <path d={CLOUDFLARE_GLYPH_ORANGE_PATH} fill={fillOrange} />
    <path d={CLOUDFLARE_GLYPH_YELLOW_PATH} fill={fillYellow} />
  </svg>
{:else}
  <svg
    viewBox={CLOUDFLARE_FULL_LOGO_VIEWBOX}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Cloudflare logo"
    class={cn(
      color === "color" && "text-kumo-default",
      color === "white" && "text-white",
      color === "black" && "text-black",
      className,
    )}
    {...restProps}
  >
    <path d={CLOUDFLARE_FULL_LOGO_ORANGE_PATH} fill={fillOrange} />
    <path d={CLOUDFLARE_FULL_LOGO_YELLOW_PATH} fill={fillYellow} />
    {#each CLOUDFLARE_WORDMARK_PATHS as d (d)}
      <path {d} fill="currentColor" />
    {/each}
  </svg>
{/if}
