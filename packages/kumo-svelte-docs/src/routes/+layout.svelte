<script lang="ts">
  import Sidebar from "$lib/components/sidebar.svelte";
  import { TooltipProvider } from "kumo-svelte";
  import "../styles.css";

  let { children, data } = $props();
</script>

<div class="site-shell">
  <div data-slot="mark" aria-hidden="true">
    <a class="flex h-full w-full items-center justify-center text-2xl" href="/" tabindex="-1">雲</a>
  </div>

  <div data-slot="left-rail"></div>

  <div data-slot="brand" class="flex items-center px-3">
    Kumo Svelte
  </div>

  <div data-slot="sidebar" class="overflow-hidden">
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
      "left-rail sidebar main" 1fr / 3rem 16rem minmax(0, 1fr);
  }

  [data-slot="mark"] {
    position: sticky;
    top: 0;
    grid-area: mark;
    border-bottom: 1px solid var(--kumo-line);
  }

  [data-slot="left-rail"] {
    position: sticky;
    top: calc(3rem + 1px);
    grid-area: left-rail;
    height: calc(100dvh - 3rem - 1px);
    min-height: 0;
  }

  [data-slot="brand"] {
    position: sticky;
    top: 0;
    grid-area: brand;
    border-right: 1px solid var(--kumo-line);
    border-bottom: 1px solid var(--kumo-line);
    border-left: 1px solid var(--kumo-line);
  }

  [data-slot="sidebar"] {
    position: sticky;
    top: calc(3rem + 1px);
    grid-area: sidebar;
    height: calc(100dvh - 3rem - 1px);
    min-height: 0;
    border-right: 1px solid var(--kumo-line);
    border-left: 1px solid var(--kumo-line);
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
