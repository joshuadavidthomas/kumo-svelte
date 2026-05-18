<script lang="ts">
  import type { DocTocItem } from "$lib/routes/component-pages";

  interface TocGroup {
    h2: DocTocItem;
    h3s: DocTocItem[];
  }

  interface Props {
    items: DocTocItem[];
    layout?: "select" | "sidebar";
  }

  let { items, layout = "sidebar" }: Props = $props();

  let groups = $derived(groupItems(items.filter((item) => item.depth <= 3)));
  let selected = $derived(items[0]?.id ?? "");

  function groupItems(headings: DocTocItem[]): TocGroup[] {
    const nextGroups: TocGroup[] = [];
    for (const heading of headings) {
      if (heading.depth === 2) {
        nextGroups.push({ h2: heading, h3s: [] });
      } else if (heading.depth === 3 && nextGroups.length > 0) {
        nextGroups[nextGroups.length - 1].h3s.push(heading);
      }
    }
    return nextGroups;
  }

  function jumpTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  }
</script>

{#if groups.length > 0}
  {#if layout === "select"}
    <nav class="toc-select" aria-label="Table of contents">
      <select aria-label="Jump to section" bind:value={selected} onchange={(event) => jumpTo(event.currentTarget.value)}>
        {#each groups as group (group.h2.id)}
          <optgroup label={group.h2.text}>
            <option value={group.h2.id}>{group.h2.text}</option>
            {#each group.h3s as h3 (h3.id)}
              <option value={h3.id}>　{h3.text}</option>
            {/each}
          </optgroup>
        {/each}
      </select>
      <span aria-hidden="true">⌄</span>
    </nav>
  {:else}
    <nav class="toc-sidebar" aria-label="Table of contents">
      <strong>On this page</strong>
      <div>
        {#each groups as group (group.h2.id)}
          <a href={`#${group.h2.id}`}>{group.h2.text}</a>
          {#each group.h3s as h3 (h3.id)}
            <a class="indented" href={`#${h3.id}`}>{h3.text}</a>
          {/each}
        {/each}
      </div>
    </nav>
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

  .toc-select span {
    position: absolute;
    top: 50%;
    right: 0.85rem;
    pointer-events: none;
    transform: translateY(-50%);
    color: var(--kumo-muted);
  }

  .toc-sidebar {
    color: var(--kumo-faint);
    font-size: 0.8125rem;
  }

  .toc-sidebar strong {
    color: var(--kumo-text);
    font-size: 0.8125rem;
    font-weight: 650;
  }

  .toc-sidebar div {
    display: grid;
    gap: 0.35rem;
    margin-top: 0.75rem;
    border-left: 1px solid var(--kumo-line);
    padding-left: 0.75rem;
  }

  .toc-sidebar a {
    color: var(--kumo-muted);
    text-decoration: none;
  }

  .toc-sidebar a:hover {
    color: var(--kumo-text);
  }

  .toc-sidebar a.indented {
    padding-left: 0.75rem;
  }
</style>
