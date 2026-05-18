<script lang="ts">
  import TableOfContents from "$lib/components/table-of-contents.svelte";
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  interface Props {
    children: Snippet;
    data: LayoutData;
  }

  let { children, data }: Props = $props();
</script>

<main>
  <header>
    <div>
      <h1>{data.page.title}</h1>
      <p>{data.page.description}</p>
    </div>
    <nav aria-label="Page links">
      {#if data.page.editUrl}
        <a href={data.page.editUrl}>Source</a>
      {/if}
      {#if data.page.primitiveUrl}
        <a href={data.page.primitiveUrl}>Bits UI</a>
      {/if}
    </nav>
  </header>

  {#if data.page.toc.length}
    <div data-toc-mobile>
      <TableOfContents items={data.page.toc} layout="select" />
    </div>
  {/if}

  <div data-doc-layout>
    <article>
      {@render children()}
    </article>
    {#if data.page.toc.length}
      <aside aria-label="On this page">
        <TableOfContents items={data.page.toc} />
      </aside>
    {/if}
  </div>
</main>

<style>
  header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1.5rem;
    border-right: 1px solid var(--kumo-line);
    border-bottom: 1px solid var(--kumo-line);
    padding: 3rem;
  }

  header h1 {
    margin: 0;
    max-width: 44rem;
    color: var(--kumo-text);
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.025em;
  }

  header p:not([data-eyebrow]) {
    max-width: 46rem;
    color: var(--kumo-muted);
    font-size: 1.125rem;
    line-height: 1.55;
  }

  nav[aria-label="Page links"] {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 0.5rem;
  }

  nav[aria-label="Page links"] a {
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

  [data-doc-layout] {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(12rem, 1fr);
    gap: 4rem;
    border-right: 1px solid var(--kumo-line);
    padding: 3rem;
  }

  article {
    min-width: 0;
    max-width: none;
  }

  article :global(h2),
  article :global(h3),
  article :global(h4) {
    scroll-margin-top: 8rem;
    color: var(--kumo-text);
  }

  article :global(h2) {
    margin: 2.75rem 0 1rem;
    font-size: 1.5rem;
    font-weight: 650;
    letter-spacing: -0.02em;
  }

  article :global(h3) {
    margin: 2rem 0 0.75rem;
    font-size: 1.05rem;
    font-weight: 650;
  }

  article :global(h4) {
    margin: 1.25rem 0 0.5rem;
    font-size: 0.9rem;
  }

  article :global(p),
  article :global(li) {
    color: var(--kumo-muted);
    font-size: 0.95rem;
    line-height: 1.55;
  }

  article :global(a) {
    color: #67a8ff;
    font-weight: 600;
  }

  article :global(code) {
    border: 1px solid var(--kumo-line);
    border-radius: 0.25rem;
    background: var(--kumo-control);
    padding: 0.125rem 0.375rem;
    color: var(--kumo-text);
    font-size: 0.875em;
    font-weight: 500;
  }

  article :global(pre) {
    overflow: auto;
    border: 1px solid var(--kumo-line-strong);
    border-radius: 0.5rem;
    background: var(--kumo-black) !important;
    margin: 0.75rem 0 1rem;
    padding: 0.875rem 1rem;
    font-size: 0.9375rem;
    line-height: 1.55;
  }

  article :global(pre code) {
    display: block;
    border: 0;
    background: transparent;
    padding: 0;
    color: var(--kumo-text);
    font-size: inherit;
    font-weight: 400;
    white-space: pre;
  }

  article :global(table) {
    width: 100%;
    border-collapse: collapse;
  }

  article :global(th),
  article :global(td) {
    border-bottom: 1px solid var(--kumo-line);
    padding: 0.7rem;
    text-align: left;
    vertical-align: top;
  }

  article :global(th) {
    color: var(--kumo-text);
    font-size: 0.75rem;
  }

  [data-toc-mobile] {
    position: sticky;
    z-index: 3;
    top: 3rem;
    display: none;
    border-bottom: 1px solid var(--kumo-line);
    background: var(--kumo-black);
    padding: 0.75rem;
  }

  aside {
    position: sticky;
    top: 6rem;
    display: block;
    align-self: start;
    min-width: 0;
  }

  @media (max-width: 1279px) {
    [data-toc-mobile] {
      display: block;
    }

    [data-doc-layout] {
      grid-template-columns: minmax(0, 1fr);
    }

    aside {
      display: none;
    }
  }
</style>
