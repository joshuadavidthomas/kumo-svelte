import { getShikiContext } from "./context.svelte";
import type { UseShikiHighlighterResult } from "./types";

export function useShikiHighlighter(): UseShikiHighlighterResult {
  const context = getShikiContext();

  return {
    get error() {
      return context.error;
    },
    highlight: (code, lang) => context.highlight(code, lang),
    get isLoading() {
      return context.isLoading;
    },
    get isReady() {
      return !context.isLoading && context.highlighter !== null;
    },
    get labels() {
      return context.labels;
    },
  };
}
