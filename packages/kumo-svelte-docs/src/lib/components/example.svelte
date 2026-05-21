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
  <div class="not-prose flex min-h-30 items-center justify-center p-6 text-kumo-default leading-[normal]">
    {@render children()}
  </div>
  {#if highlightedCode}
    <div class="prose-pre:rounded-none prose-pre:my-0 border-t border-[var(--kumo-line)]">
      {@html highlightedCode}
    </div>
  {/if}
</figure>
