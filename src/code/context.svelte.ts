import { getContext, setContext } from "svelte";
import type { HighlighterCore } from "shiki/core";
import { DEFAULT_CODE_HIGHLIGHTED_LABELS, highlightWithKumoThemes } from "./shared";
import type { CodeHighlightedLabels, SupportedLanguage } from "./types";

const SHIKI_CONTEXT = Symbol("kumo-shiki-context");

export class ShikiContextState {
  highlighter = $state<HighlighterCore | null>(null);
  isLoading = $state(true);
  error = $state<Error | null>(null);
  languages = $state<SupportedLanguage[]>([]);
  labels = $state<Required<CodeHighlightedLabels>>({
    ...DEFAULT_CODE_HIGHLIGHTED_LABELS,
  });

  highlight(code: string, lang: SupportedLanguage): string | null {
    if (!this.highlighter) return null;

    if (!this.languages.includes(lang)) {
      console.warn(
        `[Kumo CodeHighlighted] Language "${lang}" is not in the ShikiProvider's languages list. Rendering as plain text.`,
      );
      return null;
    }

    try {
      return highlightWithKumoThemes(this.highlighter, code, lang);
    } catch (error) {
      console.warn(
        `[Kumo CodeHighlighted] Failed to highlight code with language "${lang}":`,
        error,
      );
      return null;
    }
  }

  dispose() {
    this.highlighter?.dispose();
    this.highlighter = null;
  }
}

export function setShikiContext(context: ShikiContextState) {
  return setContext(SHIKI_CONTEXT, context);
}

export function getShikiContext() {
  const context = getContext<ShikiContextState | undefined>(SHIKI_CONTEXT);

  if (!context) {
    throw new Error(
      "useShikiHighlighter must be used within a ShikiProvider from 'kumo-svelte/code'.",
    );
  }

  return context;
}
