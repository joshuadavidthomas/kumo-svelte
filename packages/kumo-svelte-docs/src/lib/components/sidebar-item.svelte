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
  <a class="relative z-10 my-[.05rem] block rounded-lg p-2 pl-4 text-sm text-kumo-subtle no-underline transition-colors hover:bg-kumo-fill-hover hover:text-kumo-default aria-[current=page]:bg-kumo-fill-hover aria-[current=page]:font-semibold aria-[current=page]:text-kumo-default" aria-current={isActive ? "page" : undefined} {href}>
    {@render children()}
  </a>
</li>
