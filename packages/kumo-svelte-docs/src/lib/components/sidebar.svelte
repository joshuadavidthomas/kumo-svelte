<script lang="ts">
  import type { DocsNavItem } from "$lib/component-docs";
  import { componentItems } from "$lib/component-docs";
  import { blockItems, chartItems, staticPages } from "$lib/nav";
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import SidebarItem from "./sidebar-item.svelte";
  import SidebarSection from "./sidebar-section.svelte";

  let search = $state("");

  let query = $derived(search.trim().toLowerCase());
  let visibleStaticPages = $derived(filterItems(staticPages));
  let visibleComponentItems = $derived(filterItems(componentItems));
  let visibleChartItems = $derived(filterItems(chartItems));
  let visibleBlockItems = $derived(filterItems(blockItems));

  function filterItems(items: DocsNavItem[]) {
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
      {#each visibleStaticPages as item (item.href)}
        <SidebarItem href={item.href}>{item.label}</SidebarItem>
      {/each}
    </ul>

    <div class="nav-divider"></div>

    <SidebarSection id="components-nav" title="Components" maxHeight="110rem">
      {#each visibleComponentItems as item (item.href)}
        <SidebarItem href={item.href}>{item.label}</SidebarItem>
      {/each}
    </SidebarSection>

    <SidebarSection id="charts-nav" title="Charts" maxHeight="18rem">
      {#each visibleChartItems as item (item.href)}
        <SidebarItem href={item.href}>{item.label}</SidebarItem>
      {/each}
    </SidebarSection>

    <SidebarSection id="blocks-nav" title="Blocks" maxHeight="12rem">
      {#each visibleBlockItems as item (item.href)}
        <SidebarItem href={item.href}>{item.label}</SidebarItem>
      {/each}
    </SidebarSection>
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


  .nav-divider {
    margin: 1rem 0;
    border-bottom: 1px solid var(--kumo-line);
  }

</style>
