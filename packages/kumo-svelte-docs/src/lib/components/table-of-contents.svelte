<script lang="ts">
  import type { DocTocItem } from "$lib/routes/component-pages";
  import {
    TableOfContents as KumoTableOfContents,
    TableOfContentsGroup,
    TableOfContentsItem,
    TableOfContentsList,
    TableOfContentsTitle,
  } from "kumo-svelte";
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
  import { onDestroy } from "svelte";

  interface TocGroup {
    h2: DocTocItem;
    h3s: DocTocItem[];
  }

  interface Props {
    items: DocTocItem[];
    layout?: "select" | "sidebar";
  }

  let { items, layout = "sidebar" }: Props = $props();

  let activeId = $state("");
  let headings = $derived(items.filter((item) => item.depth <= 3));
  let groups = $derived(groupItems(headings));
  let activeHeadingId = $derived(
    headings.some((heading) => heading.id === activeId) ? activeId : (headings[0]?.id ?? ""),
  );

  let suppressObserver = false;
  let suppressTimer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => {
    clearTimeout(suppressTimer);
  });

  $effect(() => {
    if (typeof document === "undefined" || headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserver) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop,
          );

        if (visible.length > 0) {
          activeId = visible[0].target.id;
          return;
        }

        const first = document.getElementById(headings[0].id);
        const lastHeading = headings[headings.length - 1];
        const last = lastHeading ? document.getElementById(lastHeading.id) : null;

        if (first && window.scrollY < first.offsetTop) {
          activeId = headings[0].id;
        } else if (last && window.scrollY >= last.offsetTop) {
          activeId = last.id;
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: [0, 1] },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  });

  function groupItems(nextHeadings: DocTocItem[]): TocGroup[] {
    const nextGroups: TocGroup[] = [];
    for (const heading of nextHeadings) {
      if (heading.depth === 2) {
        nextGroups.push({ h2: heading, h3s: [] });
      } else if (heading.depth === 3 && nextGroups.length > 0) {
        nextGroups[nextGroups.length - 1].h3s.push(heading);
      }
    }
    return nextGroups;
  }

  function handleClick(id: string) {
    activeId = id;
    suppressObserver = true;
    clearTimeout(suppressTimer);
    suppressTimer = setTimeout(() => {
      suppressObserver = false;
    }, 1000);
  }

  function jumpTo(id: string) {
    handleClick(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  }
</script>

{#if groups.length > 0}
  {#if layout === "select"}
    <nav class="toc-select" aria-label="Table of contents">
      <select
        aria-label="Jump to section"
        value={activeHeadingId}
        onchange={(event) => jumpTo(event.currentTarget.value)}
      >
        {#each groups as group (group.h2.id)}
          <optgroup label={group.h2.text}>
            <option value={group.h2.id}>{group.h2.text}</option>
            {#each group.h3s as h3 (h3.id)}
              <option value={h3.id}>{"  "}{h3.text}</option>
            {/each}
          </optgroup>
        {/each}
      </select>
      <span class="toc-select-icon" aria-hidden="true">
        <CaretDownIcon size={16} weight="bold" />
      </span>
    </nav>
  {:else}
    <KumoTableOfContents>
      <TableOfContentsTitle>On this page</TableOfContentsTitle>
      <TableOfContentsList>
        {#each groups as group (group.h2.id)}
          {#if group.h3s.length === 0}
            <TableOfContentsItem
              href={`#${group.h2.id}`}
              active={activeHeadingId === group.h2.id}
              onclick={() => handleClick(group.h2.id)}
            >
              {group.h2.text}
            </TableOfContentsItem>
          {:else}
            <TableOfContentsGroup
              label={group.h2.text}
              href={`#${group.h2.id}`}
              active={activeHeadingId === group.h2.id}
            >
              {#each group.h3s as h3 (h3.id)}
                <TableOfContentsItem
                  href={`#${h3.id}`}
                  active={activeHeadingId === h3.id}
                  onclick={() => handleClick(h3.id)}
                >
                  {h3.text}
                </TableOfContentsItem>
              {/each}
            </TableOfContentsGroup>
          {/if}
        {/each}
      </TableOfContentsList>
    </KumoTableOfContents>
  {/if}
{/if}

<style>
  .toc-select {
    position: relative;
  }

  .toc-select select {
    width: 100%;
    appearance: none;
    border: 1px solid var(--kumo-line-strong);
    border-radius: 0.5rem;
    background: var(--kumo-control);
    padding: 0.65rem 2.25rem 0.65rem 0.85rem;
    color: var(--kumo-text);
    font: inherit;
    font-size: 0.875rem;
  }

  .toc-select-icon {
    position: absolute;
    top: 50%;
    right: 0.85rem;
    pointer-events: none;
    transform: translateY(-50%);
    color: var(--kumo-muted);
  }
</style>
