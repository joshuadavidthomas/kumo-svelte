<script lang="ts">
  import { page } from "$app/state";
  import { docsNavigation } from "$lib/nav";

  function isActive(href: string) {
    return href === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(href);
  }
</script>

<aside class="sidebar" aria-label="Documentation navigation">
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
            <li>
              <a aria-current={isActive(item.href) ? "page" : undefined} href={item.href}>{item.label}</a>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </nav>
</aside>

<style>
  .sidebar {
    overflow: auto;
    background: var(--kumo-black);
  }


  .search-field {
    display: flex;
    height: 2.15rem;
    align-items: center;
    gap: 0.5rem;
    margin: 0.875rem 0.75rem 0.75rem;
    border: 1px solid var(--kumo-line-strong);
    border-radius: 0.375rem;
    background: var(--kumo-control);
    padding: 0 0.75rem;
    color: var(--kumo-faint);
  }

  .search-field input {
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--kumo-text);
    font: inherit;
    font-size: 0.8125rem;
  }

  .search-field input::placeholder {
    color: var(--kumo-faint);
  }

  .nav-group {
    margin: 1rem 0.75rem 0;
  }

  .nav-group + .nav-group {
    border-top: 1px solid var(--kumo-line);
    padding-top: 1rem;
  }

  .nav-group h2 {
    margin: 0 0 0.5rem;
    color: var(--kumo-text);
    font-size: 0.75rem;
    font-weight: 600;
  }

  .nav-group ul {
    display: grid;
    gap: 0.125rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav-group a {
    display: block;
    border-radius: 0.375rem;
    padding: 0.44rem 0.5rem;
    color: var(--kumo-muted);
    font-size: 0.85rem;
    line-height: 1.15;
    text-decoration: none;
  }

  .nav-group a:hover,
  .nav-group a[aria-current="page"] {
    background: var(--kumo-control-hover);
    color: var(--kumo-text);
  }
</style>
