<script lang="ts">
  import Sidebar from "$lib/components/sidebar.svelte";
  import SidebarSimpleIcon from "phosphor-svelte/lib/SidebarSimpleIcon";
  import { TooltipProvider } from "kumo-svelte";
  import "../styles.css";

  let { children } = $props();
  let sidebarOpen = $state(true);
</script>

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

  <header
    data-slot="topbar"
    class="flex items-center justify-end gap-3.5 px-3.5 bg-[var(--kumo-black)]"
  >
    <a
      href="https://github.com/joshuadavidthomas/kumo-svelte"
      class="text-[0.8125rem] text-[var(--kumo-muted)] no-underline font-mono"
    >
      kumo-svelte
    </a>
  </header>

  <div data-slot="main" class="min-w-0">
    <TooltipProvider>
      {@render children()}
    </TooltipProvider>
  </div>
</div>

<style>
  .site-shell {
    display: grid;
    min-height: 100vh;
    gap: 1px;
    grid-template:
      "mark brand topbar" 3rem
      "left-rail sidebar main" 1fr / 3rem 0 minmax(0, 1fr);
    transition: grid-template-columns 300ms ease;
  }

  .site-shell.sidebar-open {
    grid-template-columns: 3rem 16rem minmax(0, 1fr);
  }

  [data-slot="mark"] {
    position: sticky;
    top: 0;
    display: grid;
    grid-area: mark;
    place-items: center;
    border-bottom: 1px solid var(--kumo-line);
    background: var(--kumo-black);
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
    color: var(--kumo-muted);
    transition:
      background-color 150ms ease,
      color 150ms ease;
  }

  .sidebar-toggle:hover {
    background: var(--kumo-control-hover);
    color: var(--kumo-text);
  }

  .sidebar-toggle:focus-visible {
    outline: 2px solid var(--kumo-blue);
    outline-offset: -2px;
  }

  [data-slot="left-rail"] {
    position: sticky;
    top: calc(3rem + 1px);
    grid-area: left-rail;
    height: calc(100dvh - 3rem - 1px);
    min-height: 0;
    background: var(--kumo-black);
  }

  [data-slot="brand"] {
    position: sticky;
    top: 0;
    min-width: 0;
    overflow: hidden;
    grid-area: brand;
    border-right: 1px solid var(--kumo-line);
    border-bottom: 1px solid var(--kumo-line);
    border-left: 1px solid var(--kumo-line);
    background: var(--kumo-black);
    white-space: nowrap;
    transition: opacity 200ms ease;
  }

  .site-shell:not(.sidebar-open) [data-slot="brand"] {
    opacity: 0;
  }

  [data-slot="sidebar"] {
    position: sticky;
    top: calc(3rem + 1px);
    min-width: 0;
    overflow: hidden;
    grid-area: sidebar;
    height: calc(100dvh - 3rem - 1px);
    min-height: 0;
    border-right: 1px solid var(--kumo-line);
    border-left: 1px solid var(--kumo-line);
    transition: opacity 200ms ease;
  }

  .site-shell:not(.sidebar-open) [data-slot="sidebar"] {
    opacity: 0;
    pointer-events: none;
  }

  [data-slot="topbar"] {
    position: sticky;
    top: 0;
    grid-area: topbar;
    border-bottom: 1px solid var(--kumo-line);
  }

  [data-slot="main"] {
    grid-area: main;
  }
</style>
