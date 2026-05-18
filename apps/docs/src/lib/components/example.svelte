<script lang="ts">
  import { page } from "$app/state";

  interface Props {
    children: import("svelte").Snippet;
    code?: string;
    demo?: string;
    title: string;
  }

  let { children, code, demo, title }: Props = $props();
  let highlightedCode = $derived(code ?? (demo ? page.data.highlightedDemos?.[demo] : undefined));
</script>

<figure class="example-card not-prose" aria-label={title}>
  <div class="example-demo">
    {@render children()}
  </div>
  {#if highlightedCode}
    <div class="example-code">
      {@html highlightedCode}
    </div>
  {/if}
</figure>

<style>
  .example-card {
    overflow: hidden;
    margin: 1rem 0 1.5rem;
    border: 1px solid var(--kumo-line);
    border-radius: 0.5rem;
    background: var(--kumo-panel);
  }

  .example-demo {
    display: flex;
    min-height: 7.5rem;
    align-items: center;
    justify-content: center;
    background: var(--kumo-black);
    padding: 1.5rem;
  }

  .example-code :global(pre) {
    margin: 0;
    border: 0;
    border-top: 1px solid var(--kumo-line);
    border-radius: 0;
    background: var(--kumo-panel) !important;
  }
</style>
