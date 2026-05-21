<script lang="ts">
  import { onDestroy } from "svelte";
  import type { HighlighterCore } from "shiki/core";
  import { ShikiContextState, setShikiContext } from "./context.svelte";
  import { createKumoHighlighter } from "./shared";
  import type { ShikiProviderProps } from "./types";

  let { children, engine, labels, languages }: ShikiProviderProps = $props();

  const context = setShikiContext(
    new ShikiContextState({
      getLabels: () => labels,
      getLanguages: () => languages,
    }),
  );

  let activeHighlighter: HighlighterCore | null = null;

  function disposeActiveHighlighter() {
    activeHighlighter?.dispose();
    activeHighlighter = null;
    context.highlighter = null;
  }

  $effect(() => {
    let cancelled = false;
    const selectedEngine = engine;
    const selectedLanguages = [...languages];

    disposeActiveHighlighter();
    context.isLoading = true;
    context.error = null;

    void createKumoHighlighter({
      engine: selectedEngine,
      languages: selectedLanguages,
    })
      .then((highlighter) => {
        if (cancelled) {
          highlighter.dispose();
          return;
        }

        activeHighlighter = highlighter;
        context.highlighter = highlighter;
        context.isLoading = false;
      })
      .catch((error: unknown) => {
        if (cancelled) return;

        context.error =
          error instanceof Error ? error : new Error("Failed to load Shiki");
        context.isLoading = false;
      });

    return () => {
      cancelled = true;
    };
  });

  onDestroy(() => {
    disposeActiveHighlighter();
  });
</script>

{@render children?.()}

