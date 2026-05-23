<script lang="ts">
  import BitsUIIcon from "$lib/components/bits-ui-icon.svelte";
  import CopyPageButton from "$lib/components/copy-page-button.svelte";
  import TableOfContents from "$lib/components/table-of-contents.svelte";
  import GithubLogoIcon from "phosphor-svelte/lib/GithubLogoIcon";
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  interface Props {
    children: Snippet;
    data: LayoutData;
  }

  let { children, data }: Props = $props();
</script>

<div class="grid grid-cols-[minmax(0,1fr)_3rem]">
  <header id="page-header" class="col-span-2 grid grid-cols-[minmax(0,1fr)_3rem] border-b border-kumo-line">
    <div class="min-w-0">
      <div class="mx-auto max-w-7xl p-12">
        <div class="mb-3 md:hidden">
          <CopyPageButton align="center" />
        </div>

        <div class="mb-3 flex items-center gap-3">
          <h1 class="m-0 max-w-[44rem] text-4xl leading-[1.1] font-bold tracking-[-0.025em] text-kumo-default">
            {data.page.title}
          </h1>
          {#if data.page.editUrl}
            <a
              href={data.page.editUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="text-kumo-subtle transition-colors hover:text-kumo-default"
              title="View source on GitHub"
              aria-label="View source on GitHub"
            >
              <GithubLogoIcon size={28} weight="fill" aria-hidden="true" />
            </a>
          {/if}
          {#if data.page.bitsUiUrl}
            <a
              href={data.page.bitsUiUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="text-kumo-subtle transition-colors hover:text-kumo-default"
              title="View Bits UI documentation"
              aria-label="View Bits UI documentation"
            >
              <BitsUIIcon size={28} />
            </a>
          {/if}
          <div class="ml-auto hidden md:block">
            <CopyPageButton />
          </div>
        </div>

        <p class="max-w-[46rem] text-lg leading-[1.55] text-kumo-subtle">
          {data.page.description}
        </p>
      </div>
    </div>
    <div class="border-l border-kumo-line" aria-hidden="true"></div>
  </header>

  <main class="col-span-2 grid grid-cols-[minmax(0,1fr)_3rem]">
    <div class="min-w-0">
      {#if data.page.toc.length}
        <div class="sticky top-12 z-[3] block border-b border-kumo-line bg-kumo-canvas xl:hidden">
          <div class="mx-auto max-w-7xl px-3 py-3">
            <TableOfContents items={data.page.toc} layout="select" />
          </div>
        </div>
      {/if}

      <div class="mx-auto max-w-7xl p-12 pr-10">
        <div class="grid grid-cols-1 gap-16 xl:grid-cols-[3fr_1fr]">
          <article class="prose prose-invert min-w-0 max-w-none scroll-mt-32">
            {@render children()}
          </article>
          {#if data.page.toc.length}
            <aside class="hidden min-w-0 xl:block" aria-label="On this page">
              <div class="sticky top-24">
                <TableOfContents items={data.page.toc} />
              </div>
            </aside>
          {/if}
        </div>
      </div>
    </div>
    <div class="border-l border-kumo-line" aria-hidden="true"></div>
  </main>
</div>
