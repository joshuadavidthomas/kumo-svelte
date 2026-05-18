<script lang="ts">
  import { componentItems } from "$lib/nav";
</script>

<section class="home-hero">
  <div>
    <p class="eyebrow">Kumo Svelte</p>
    <h1>Cloudflare's Kumo component library, ported to idiomatic Svelte 5.</h1>
    <p>Browse component documentation as each page is ported to real SvelteKit and mdsvex content.</p>
  </div>
  <div class="home-actions">
    <a class="button-link primary" href="/components/autocomplete">Start with Autocomplete</a>
    <a class="button-link" href="https://github.com/joshuadavidthomas/kumo-svelte">GitHub</a>
  </div>
</section>

<section id="components" class="component-board" aria-label="Component documentation">
  {#each componentItems as item (item.href)}
    <article class="demo-tile">
      <a class="demo-title" href={item.href}>{item.label}</a>
      <div class="demo-component docs-card-preview">
        {#if item.href === "/components/autocomplete"}
          <span class="status-pill ready">Ported</span>
          <p>Real mdsvex page with colocated Svelte demos.</p>
        {:else}
          <span class="status-pill">Not ported yet</span>
          <p>This page has an honest placeholder until it gets real docs.</p>
        {/if}
      </div>
    </article>
  {/each}
</section>

<style>
  .button-link {
    display: inline-flex;
    min-height: 2rem;
    align-items: center;
    border: 1px solid var(--kumo-line-strong);
    border-radius: 0.375rem;
    background: var(--kumo-control);
    padding: 0.4rem 0.7rem;
    color: var(--kumo-text);
    font-size: 0.8125rem;
    font-weight: 600;
    text-decoration: none;
  }

  .button-link.primary {
    border-color: var(--kumo-blue);
    background: var(--kumo-blue);
    color: #fff;
  }
</style>
