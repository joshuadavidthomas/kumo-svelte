<script lang="ts">
  import { page } from "$app/state";
  import type { DocsNavItem } from "$lib/component-docs";
  import { componentItems } from "$lib/component-docs";
  import { blockItems, chartItems, staticPages } from "$lib/nav";
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";

  let search = $state("");
  let componentsOpen = $state(true);
  let chartsOpen = $state(true);
  let blocksOpen = $state(true);

  function normalizePathname(pathname: string) {
    if (!pathname || pathname === "/") return "/";
    return pathname.replace(/\/+$/, "");
  }

  function isActive(href: string, exact = false) {
    const activePath = normalizePathname(page.url.pathname);
    const normalized = normalizePathname(href);

    if (exact || normalized === "/") {
      return activePath === normalized;
    }

    return activePath === normalized || activePath.startsWith(`${normalized}/`);
  }

  function visibleItems(items: DocsNavItem[]) {
    const query = search.trim().toLowerCase();
    if (!query) return items;

    return items.filter(
      (item) => item.label.toLowerCase().includes(query) || item.href.includes(query),
    );
  }
</script>

<aside class="sidebar" aria-label="Documentation navigation">
  <label class="search-field">
    <span class="search-icon" aria-hidden="true">
      <MagnifyingGlassIcon size={16} />
    </span>
    <input bind:value={search} type="search" placeholder="Search..." />
  </label>

  <nav aria-label="Primary documentation navigation">
    <ul class="nav-list static-list">
      {#each visibleItems(staticPages) as item (item.href)}
        <li>
          <a class="nav-link" aria-current={isActive(item.href) ? "page" : undefined} href={item.href}>
            {item.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="nav-divider"></div>

    <section class="nav-section">
      <button
        type="button"
        class="section-toggle"
        aria-expanded={componentsOpen}
        aria-controls="components-nav"
        onclick={() => (componentsOpen = !componentsOpen)}
      >
        <span>Components</span>
        <span class="section-caret" aria-hidden="true">
          <CaretDownIcon size={12} />
        </span>
      </button>
      <ul
        id="components-nav"
        class="nav-list section-list"
        class:collapsed={!componentsOpen}
        aria-hidden={!componentsOpen}
        inert={!componentsOpen}
        style="--nav-section-max-height: 110rem;"
      >
        {#each visibleItems(componentItems) as item (item.href)}
          <li>
            <a
              class="nav-link child-link"
              aria-current={isActive(item.href, true) ? "page" : undefined}
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </section>

    <section class="nav-section">
      <button
        type="button"
        class="section-toggle"
        aria-expanded={chartsOpen}
        aria-controls="charts-nav"
        onclick={() => (chartsOpen = !chartsOpen)}
      >
        <span>Charts</span>
        <span class="section-caret" aria-hidden="true">
          <CaretDownIcon size={12} />
        </span>
      </button>
      <ul
        id="charts-nav"
        class="nav-list section-list"
        class:collapsed={!chartsOpen}
        aria-hidden={!chartsOpen}
        inert={!chartsOpen}
        style="--nav-section-max-height: 18rem;"
      >
        {#each visibleItems(chartItems) as item (item.href)}
          <li>
            <a
              class="nav-link child-link"
              aria-current={isActive(item.href, true) ? "page" : undefined}
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </section>

    <section class="nav-section">
      <button
        type="button"
        class="section-toggle"
        aria-expanded={blocksOpen}
        aria-controls="blocks-nav"
        onclick={() => (blocksOpen = !blocksOpen)}
      >
        <span>Blocks</span>
        <span class="section-caret" aria-hidden="true">
          <CaretDownIcon size={12} />
        </span>
      </button>
      <ul
        id="blocks-nav"
        class="nav-list section-list"
        class:collapsed={!blocksOpen}
        aria-hidden={!blocksOpen}
        inert={!blocksOpen}
        style="--nav-section-max-height: 12rem;"
      >
        {#each visibleItems(blockItems) as item (item.href)}
          <li>
            <a
              class="nav-link child-link"
              aria-current={isActive(item.href, true) ? "page" : undefined}
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </section>
  </nav>
</aside>

<style>
  .sidebar {
    height: 100%;
    overflow: auto;
    background: var(--kumo-black);
    padding: 0.875rem 0.75rem 1rem;
  }

  .search-field {
    display: flex;
    height: 2.15rem;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    border: 1px solid var(--kumo-line-strong);
    border-radius: 0.5rem;
    background: var(--kumo-control);
    padding: 0 0.75rem;
    color: var(--kumo-faint);
  }

  .search-icon {
    flex: none;
  }

  .search-field input {
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--kumo-text);
    font: inherit;
    font-size: 0.875rem;
  }

  .search-field input::placeholder {
    color: var(--kumo-faint);
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav-link {
    position: relative;
    z-index: 1;
    display: block;
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: var(--kumo-muted);
    font-size: 0.875rem;
    line-height: 1.15;
    text-decoration: none;
    transition:
      background-color 150ms ease,
      color 150ms ease;
  }

  .child-link {
    padding-left: 1rem;
  }

  .nav-link:hover,
  .nav-link[aria-current="page"] {
    background: var(--kumo-control-hover);
    color: var(--kumo-text);
  }

  .nav-link[aria-current="page"] {
    font-weight: 600;
  }

  .nav-divider {
    margin: 1rem 0;
    border-bottom: 1px solid var(--kumo-line);
  }

  .nav-section {
    margin-bottom: 1rem;
  }

  .section-toggle {
    display: flex;
    width: 100%;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
    border: 0;
    border-radius: 0.5rem;
    background: transparent;
    padding: 0.5rem;
    color: var(--kumo-text);
    font: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;
    transition:
      background-color 150ms ease,
      color 150ms ease;
  }

  .section-toggle:hover {
    background: var(--kumo-control-hover);
  }

  .section-toggle:focus-visible {
    outline: 2px solid var(--kumo-blue);
    outline-offset: -2px;
  }

  .section-caret {
    color: var(--kumo-muted);
    transition: transform 200ms ease;
  }

  .section-toggle[aria-expanded="false"] .section-caret {
    transform: rotate(-90deg);
  }

  .section-list {
    max-height: var(--nav-section-max-height);
    overflow: hidden;
    opacity: 1;
    transition:
      max-height 300ms ease,
      opacity 200ms ease;
  }

  .section-list.collapsed {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }
</style>
