<script lang="ts">
  import { onDestroy } from "svelte";
  import { ShikiContextState, setShikiContext } from "./context.svelte";
  import {
    createKumoHighlighter,
    DEFAULT_CODE_HIGHLIGHTED_LABELS,
  } from "./shared";
  import type { ShikiProviderProps } from "./types";

  let { children, engine, labels, languages }: ShikiProviderProps = $props();

  const context = setShikiContext(new ShikiContextState());

  $effect(() => {
    context.languages = languages;
    context.labels = {
      ...DEFAULT_CODE_HIGHLIGHTED_LABELS,
      ...labels,
    };
  });

  $effect(() => {
    let cancelled = false;
    const selectedEngine = engine;
    const selectedLanguages = [...languages];

    context.dispose();
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
    context.dispose();
  });
</script>

{@render children?.()}

