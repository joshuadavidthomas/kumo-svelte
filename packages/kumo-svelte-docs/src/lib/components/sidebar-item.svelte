<script lang="ts">
  import { page } from "$app/state";
  import type { Snippet } from "svelte";

  interface SidebarItemProps {
    children: Snippet;
    href: string;
  }

  let { children, href }: SidebarItemProps = $props();

  function normalizePathname(pathname: string) {
    if (!pathname || pathname === "/") return "/";
    return pathname.replace(/\/+$/, "");
  }

  let isActive = $derived(normalizePathname(page.url.pathname) === normalizePathname(href));
</script>

<li>
  <a class="text-[var(--kumo-muted)] hover:bg-[var(--kumo-control-hover)] aria-[current=page]:bg-[var(--kumo-control-hover)] hover:text-[var(--kumo-text)] aria-[current=page]:text-[var(--kumo-text)] relative transition-colors rounded-lg z-10 block my-[.05rem] pl-4 p-2 text-sm no-underline aria-[current=page]:font-semibold" aria-current={isActive ? "page" : undefined} {href}>
    {@render children()}
  </a>
</li>
