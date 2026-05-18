<script lang="ts">
  import { docsNavigation } from "$docs/nav";
  import "../styles.css";

  let { children } = $props();
</script>

<div class="site-shell">
  <div class="icon-rail" aria-hidden="true">
    <a class="kumo-mark" href="/" tabindex="-1">雲</a>
  </div>

  <aside class="sidebar" aria-label="Documentation navigation">
    <a class="brand" href="/">
      <strong>Kumo</strong>
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
              <li><a href={item.href}>{item.label}</a></li>
            {/each}
          </ul>
        </section>
      {/each}
    </nav>
  </aside>

  <div class="content-shell">
    <header class="topbar">
      <span class="package-name">@cloudflare/kumo</span>
      <span class="version-pill">v0.0.0</span>
      <a href="/installation">Installation</a>
      <a href="/components/button">Components</a>
      <a href="/registry">Registry</a>
      <a href="https://github.com/joshuadavidthomas/kumo-svelte">GitHub</a>
    </header>

    {@render children()}
  </div>
</div>
