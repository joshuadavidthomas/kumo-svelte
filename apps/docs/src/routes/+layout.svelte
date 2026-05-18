<script lang="ts">
  import { page } from "$app/state";
  import { docsNavigation } from "$docs/nav";
  import "../styles.css";

  let { children } = $props();

  function isActive(href: string) {
    return href === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(href);
  }
</script>

<div class="site-shell" data-mode="dark">
  <div class="icon-rail" aria-hidden="true">
    <a class="kumo-mark" href="/" tabindex="-1">雲</a>
  </div>

  <aside class="sidebar" aria-label="Documentation navigation">
    <a class="brand" href="/">
      <strong>Kumo Svelte</strong>
    </a>

    <label class="search-field">
      <span aria-hidden="true">⌕</span>
      <input type="search" placeholder="Search..." />
    </label>

    <nav>
      {#each docsNavigation as group (group.title)}
        <section class="nav-group">
          <h2>{group.title}</h2>
          <ul>
            {#each group.items as item (item.href)}
              <li><a aria-current={isActive(item.href) ? "page" : undefined} href={item.href}>{item.label}</a></li>
            {/each}
          </ul>
        </section>
      {/each}
    </nav>
  </aside>

  <div class="content-shell">
    <header class="topbar">
      <span class="package-name">kumo-svelte</span>
      <span class="version-pill">v0.0.0</span>
      <a href="/installation">Installation</a>
      <a href="/components/button">Components</a>
      <a href="/registry">Registry</a>
      <a href="https://github.com/joshuadavidthomas/kumo-svelte">GitHub</a>
    </header>

    {@render children()}
  </div>
</div>
