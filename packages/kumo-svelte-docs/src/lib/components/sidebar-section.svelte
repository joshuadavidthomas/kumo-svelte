<script lang="ts">
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
  import type { Snippet } from "svelte";

  interface SidebarSectionProps {
    children?: Snippet;
    id: string;
    maxHeight: string;
    title: string;
  }

  let { children, id, maxHeight, title }: SidebarSectionProps = $props();
  let open = $state(true);
</script>

<section class="mb-4">
  <button
    type="button"
    class="section-toggle transition-colors p-2 flex w-full cursor-pointer items-center justify-between rounded-lg text-sm font-semibold mb-1.5"
    aria-expanded={open}
    aria-controls={id}
    onclick={() => (open = !open)}
  >
    <span>{title}</span>
    <span class="section-caret" aria-hidden="true">
      <CaretDownIcon size={12} />
    </span>
  </button>
  <ul
    {id}
    class="nav-list section-list"
    class:collapsed={!open}
    aria-hidden={!open}
    inert={!open}
    style:--nav-section-max-height={maxHeight}
  >
    {@render children?.()}
  </ul>
</section>

<style>
  .section-toggle:hover {
    background: var(--color-kumo-fill-hover);
  }

  .section-toggle:focus-visible {
    outline: 2px solid var(--color-kumo-focus);
    outline-offset: -2px;
  }

  .section-caret {
    color: var(--text-color-kumo-subtle);
    transition: transform 200ms ease;
  }

  .section-toggle[aria-expanded="false"] .section-caret {
    transform: rotate(-90deg);
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .section-list {
    max-height: var(--nav-section-max-height);
    overflow: hidden;
    opacity: 1;
    transition:
      max-height 300ms ease,
      opacity 200ms ease;
  }

  .section-list.collapsed {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }

</style>
