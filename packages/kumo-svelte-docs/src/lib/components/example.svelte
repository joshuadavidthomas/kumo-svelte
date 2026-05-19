<script lang="ts">
  import { page } from "$app/state";

  interface Props {
    children: import("svelte").Snippet;
    code?: string;
    demo?: string;
  }

  let { children, code, demo }: Props = $props();
  let highlightedCode = $derived(code ?? (demo ? page.data.highlightedDemos?.[demo] : undefined));
</script>

<figure class="border border-[var(--kumo-line)] rounded-md">
  <div class="flex items-center justify-center min-h-30 p-6 not-prose">
    {@render children()}
  </div>
  {#if highlightedCode}
    <div class="prose-pre:rounded-none prose-pre:my-0 border-t border-[var(--kumo-line)]">
      {@html highlightedCode}
    </div>
  {/if}
</figure>
