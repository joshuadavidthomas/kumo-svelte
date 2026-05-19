<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import CloudflareLogo from "./cloudflare-logo.svelte";
  import type { CloudflareLogoColor } from "./variants";

  export interface PoweredByCloudflareProps
    extends Omit<HTMLAnchorAttributes, "class" | "children"> {
    class?: string;
    color?: CloudflareLogoColor;
  }

  let {
    class: className,
    color = "color",
    href = "https://www.cloudflare.com",
    rel = "noopener noreferrer",
    target = "_blank",
    ...restProps
  }: PoweredByCloudflareProps = $props();
</script>

<a
  {href}
  {target}
  {rel}
  class={cn(
    "inline-flex items-center gap-2 rounded-lg py-2 pl-2.5 pr-3 text-sm font-medium",
    "ring-1 ring-inset transition-all hover:shadow-sm",
    color === "color" && "bg-kumo-base text-kumo-default ring-kumo-hairline",
    color === "black" && "bg-white text-black ring-black/20",
    color === "white" && "bg-black text-white ring-white/20",
    className,
  )}
  {...restProps}
>
  <CloudflareLogo variant="glyph" {color} class="h-4 w-auto" />
  <span>
    Powered by <span class="font-semibold">Cloudflare</span>
  </span>
</a>
