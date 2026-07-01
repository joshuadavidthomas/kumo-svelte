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

<figure class="overflow-hidden rounded-md border border-kumo-line">
  <div class="not-prose flex min-h-30 items-center justify-center p-6 text-kumo-default leading-[normal]">
    {@render children()}
  </div>
  {#if highlightedCode}
    <div data-docs-example-code class="border-t border-kumo-line prose-pre:my-0 prose-pre:rounded-none">
      {@html highlightedCode}
    </div>
  {/if}
</figure>
