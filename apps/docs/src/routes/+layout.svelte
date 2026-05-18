<script lang="ts">
  import { docsNavigation } from "$docs/nav";
  import "../styles.css";

  let { children } = $props();
</script>

<div class="site-shell">
  <aside class="sidebar" aria-label="Documentation navigation">
    <a class="brand" href="/">
      <span class="brand-mark">K</span>
      <span>
        <strong>Kumo Svelte</strong>
        <small>Documentation</small>
      </span>
    </a>

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
      <a href="/installation">Installation</a>
      <a href="/components/button">Components</a>
      <a href="/registry">Registry</a>
      <a href="https://github.com/joshuadavidthomas/kumo-svelte">GitHub</a>
    </header>

    {@render children()}
  </div>
</div>
