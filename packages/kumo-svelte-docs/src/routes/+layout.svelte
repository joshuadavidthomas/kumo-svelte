<script lang="ts">
  import { page } from "$app/state";
  import BitsUIIcon from "$lib/components/bits-ui-icon.svelte";
  import Sidebar from "$lib/components/sidebar.svelte";
  import ThemeToggle from "$lib/components/theme-toggle.svelte";
  import { ModeWatcher } from "mode-watcher";
  import { tick } from "svelte";
  import * as Tooltip from "kumo-svelte/components/tooltip";
  import GithubLogoIcon from "phosphor-svelte/lib/GithubLogoIcon";
  import SidebarSimpleIcon from "phosphor-svelte/lib/SidebarSimpleIcon";
  import "../styles.css";

  let { children } = $props();
  let sidebarOpen = $state(true);
  let showTopbarTitle = $state(false);
  let topbarTitle = $derived(page.data.page?.title ?? "");
  let topbarSourceUrl = $derived(page.data.page?.editUrl);
  let topbarBitsUiUrl = $derived(page.data.page?.bitsUiUrl);

  $effect(() => {
    const title = topbarTitle;
    showTopbarTitle = false;

    if (!title) return;

    let cancelled = false;
    let observer: IntersectionObserver | undefined;

    tick().then(() => {
      if (cancelled) return;

      const pageHeader = document.getElementById("page-header");
      const topbar = document.querySelector<HTMLElement>('[data-slot="topbar"]');

      if (!pageHeader || !topbar) return;

      const margin = Math.round(topbar.getBoundingClientRect().bottom);
      observer = new IntersectionObserver(
        ([entry]) => {
          showTopbarTitle = !entry.isIntersecting;
        },
        { rootMargin: `-${margin}px 0px 0px 0px` },
      );
      observer.observe(pageHeader);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  });
</script>

<ModeWatcher defaultMode="system" modeStorageKey="theme" darkClassNames={[]} />

<div class="site-shell" class:sidebar-open={sidebarOpen}>
  <div data-slot="mark">
    <button
      type="button"
      class="sidebar-toggle"
      aria-label="Toggle sidebar"
      aria-pressed={sidebarOpen}
      onclick={() => (sidebarOpen = !sidebarOpen)}
    >
      <SidebarSimpleIcon class="size-5" />
    </button>
  </div>

  <div data-slot="left-rail"></div>

  <div data-slot="brand" class="flex items-center px-3">
    Kumo Svelte
  </div>

  <div data-slot="sidebar" class="overflow-hidden" aria-hidden={!sidebarOpen} inert={!sidebarOpen}>
    <Sidebar />
  </div>

  <header data-slot="topbar" class="flex items-center bg-kumo-canvas px-3.5">
    <div
      class="flex min-w-0 flex-1 items-center gap-2 transition-opacity duration-200"
      class:pointer-events-none={!showTopbarTitle}
      class:opacity-0={!showTopbarTitle}
      aria-hidden={!showTopbarTitle}
    >
      {#if topbarTitle}
        <span class="truncate text-base font-semibold tracking-tight text-kumo-default">
          {topbarTitle}
        </span>
      {/if}
      {#if topbarSourceUrl}
        <a
          href={topbarSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 text-kumo-subtle transition-colors hover:text-kumo-default"
          title="View source on GitHub"
          aria-label="View source on GitHub"
          tabindex={showTopbarTitle ? 0 : -1}
        >
          <GithubLogoIcon size={20} weight="fill" aria-hidden="true" />
        </a>
      {/if}
      {#if topbarBitsUiUrl}
        <a
          href={topbarBitsUiUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 text-kumo-subtle transition-colors hover:text-kumo-default"
          title="View Bits UI documentation"
          aria-label="View Bits UI documentation"
          tabindex={showTopbarTitle ? 0 : -1}
        >
          <BitsUIIcon size={20} />
        </a>
      {/if}
    </div>

    <a
      href="https://github.com/joshuadavidthomas/kumo-svelte"
      class="shrink-0 font-mono text-[0.8125rem] text-kumo-subtle no-underline transition-colors hover:text-kumo-default"
    >
      kumo-svelte
    </a>
  </header>

  <div data-slot="right-mark">
    <ThemeToggle />
  </div>

  <div data-slot="main" class="min-w-0">
    <Tooltip.Provider>
      {@render children()}
    </Tooltip.Provider>
  </div>
</div>

<style>
  .site-shell {
    display: grid;
    min-height: 100vh;
    grid-template:
      "mark brand topbar right-mark" 3rem
      "left-rail sidebar main main" 1fr / 3rem 0 minmax(0, 1fr) 3rem;
    transition: grid-template-columns 300ms ease;
  }

  .site-shell.sidebar-open {
    grid-template-columns: 3rem 16rem minmax(0, 1fr) 3rem;
  }

  [data-slot="mark"] {
    grid-area: mark;
    position: sticky;
    top: 0;
    display: grid;
    place-items: center;
    border-bottom: 1px solid var(--color-kumo-line);
    background: var(--color-kumo-canvas);
  }

  .sidebar-toggle {
    display: inline-flex;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 0.5rem;
    background: transparent;
    color: var(--text-color-kumo-subtle);
    transition:
      background-color 150ms ease,
      color 150ms ease;
  }

  .sidebar-toggle:hover {
    background: var(--color-kumo-fill-hover);
    color: var(--text-color-kumo-default);
  }

  .sidebar-toggle:focus-visible {
    outline: 2px solid var(--color-kumo-focus);
    outline-offset: -2px;
  }

  [data-slot="left-rail"] {
    grid-area: left-rail;
    position: sticky;
    top: 3rem;
    height: calc(100dvh - 3rem);
    min-height: 0;
    background: var(--color-kumo-canvas);
  }

  [data-slot="brand"] {
    grid-area: brand;
    position: sticky;
    top: 0;
    min-width: 0;
    overflow: hidden;
    border-bottom: 1px solid var(--color-kumo-line);
    border-left: 1px solid var(--color-kumo-line);
    background: var(--color-kumo-canvas);
    white-space: nowrap;
    transition: opacity 200ms ease;
  }

  .site-shell:not(.sidebar-open) [data-slot="brand"] {
    opacity: 0;
  }

  [data-slot="sidebar"] {
    grid-area: sidebar;
    position: sticky;
    top: 3rem;
    min-width: 0;
    overflow: hidden;
    height: calc(100dvh - 3rem);
    min-height: 0;
    border-left: 1px solid var(--color-kumo-line);
    transition: opacity 200ms ease;
  }

  .site-shell:not(.sidebar-open) [data-slot="sidebar"] {
    opacity: 0;
    pointer-events: none;
  }

  [data-slot="topbar"] {
    grid-area: topbar;
    position: sticky;
    top: 0;
    z-index: 10;
    border-left: 1px solid var(--color-kumo-line);
    border-bottom: 1px solid var(--color-kumo-line);
  }

  [data-slot="right-mark"] {
    grid-area: right-mark;
    position: sticky;
    top: 0;
    z-index: 10;
    display: grid;
    place-items: center;
    border-left: 1px solid var(--color-kumo-line);
    border-bottom: 1px solid var(--color-kumo-line);
    background: var(--color-kumo-canvas);
  }

  [data-slot="main"] {
    grid-area: main;
    border-left: 1px solid var(--color-kumo-line);
  }
</style>
