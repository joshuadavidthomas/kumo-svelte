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
  <header class="grid grid-cols-[minmax(0,1fr)_auto] gap-6 border-r border-b border-[var(--kumo-line)] p-12">
    <div>
      <h1 class="m-0 max-w-[44rem] text-4xl leading-[1.1] font-bold tracking-[-0.025em] text-[var(--kumo-text)]">
        {data.page.title}
      </h1>
      <p class="max-w-[46rem] text-lg leading-[1.55] text-[var(--kumo-muted)]">{data.page.description}</p>
    </div>
    <nav class="flex flex-wrap content-start gap-2" aria-label="Page links">
      {#if data.page.editUrl}
        <a
          class="inline-flex min-h-8 items-center rounded-md border border-[var(--kumo-line-strong)] bg-[var(--kumo-control)] px-3 py-1.5 text-[0.8125rem] font-semibold text-[var(--kumo-text)] no-underline"
          href={data.page.editUrl}
        >
          Source
        </a>
      {/if}
      {#if data.page.primitiveUrl}
        <a
          class="inline-flex min-h-8 items-center rounded-md border border-[var(--kumo-line-strong)] bg-[var(--kumo-control)] px-3 py-1.5 text-[0.8125rem] font-semibold text-[var(--kumo-text)] no-underline"
          href={data.page.primitiveUrl}
        >
          Bits UI
        </a>
      {/if}
    </nav>
  </header>

  {#if data.page.toc.length}
    <div class="sticky top-12 z-[3] block border-b border-[var(--kumo-line)] bg-[var(--kumo-black)] p-3 xl:hidden">
      <TableOfContents items={data.page.toc} layout="select" />
    </div>
  {/if}

  <div class="grid grid-cols-1 gap-16 border-r border-[var(--kumo-line)] p-12 xl:grid-cols-[minmax(0,3fr)_minmax(12rem,1fr)]">
    <article class="prose prose-invert min-w-0 max-w-none scroll-mt-32">
      {@render children()}
    </article>
    {#if data.page.toc.length}
      <aside class="sticky top-24 hidden min-w-0 self-start xl:block" aria-label="On this page">
        <TableOfContents items={data.page.toc} />
      </aside>
    {/if}
  </div>
</main>
