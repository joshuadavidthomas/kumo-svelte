<script lang="ts">
  import type { DocPage } from "./docs.server";

  interface Props {
    page: DocPage;
  }

  let { page }: Props = $props();
</script>

<svelte:head>
  <title>{page.title} - Kumo Svelte</title>
  <meta name="description" content={page.description} />
</svelte:head>

<main class="doc-page">
  <header class="doc-header">
    <div>
      <p class="eyebrow">Documentation</p>
      <h1>{page.title}</h1>
      <p>{page.description}</p>
    </div>

    <div class="doc-links" aria-label="Page links">
      {#if page.editUrl}
        <a href={page.editUrl}>Source</a>
      {/if}
      {#if page.primitiveUrl}
        <a href={page.primitiveUrl}>Bits UI</a>
      {/if}
    </div>
  </header>

  <div class="doc-layout">
    <article class="doc-content">
      {@html page.html}
    </article>

    {#if page.toc.length > 0}
      <aside class="toc" aria-label="On this page">
        <strong>On This Page</strong>
        <nav>
          {#each page.toc as item (item.id)}
            <a class:indented={item.depth > 2} href={`#${item.id}`}>{item.text}</a>
          {/each}
        </nav>
      </aside>
    {/if}
  </div>
</main>
