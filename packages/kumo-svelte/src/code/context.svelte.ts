import { getContext, setContext } from "svelte";
import type { HighlighterCore } from "shiki/core";
import { DEFAULT_CODE_HIGHLIGHTED_LABELS, highlightWithKumoThemes } from "./shared";
import type { CodeHighlightedLabels, SupportedLanguage } from "./types";

const SHIKI_CONTEXT = Symbol("kumo-shiki-context");

interface ShikiContextOptions {
  getLabels: () => CodeHighlightedLabels | undefined;
  getLanguages: () => SupportedLanguage[];
}

export class ShikiContextState {
  readonly #getLabels: () => CodeHighlightedLabels | undefined;
  readonly #getLanguages: () => SupportedLanguage[];

  highlighter = $state<HighlighterCore | null>(null);
  isLoading = $state(true);
  error = $state<Error | null>(null);

  constructor(options: ShikiContextOptions) {
    this.#getLabels = options.getLabels;
    this.#getLanguages = options.getLanguages;
  }

  get labels(): Required<CodeHighlightedLabels> {
    return {
      ...DEFAULT_CODE_HIGHLIGHTED_LABELS,
      ...this.#getLabels(),
    };
  }

  get languages() {
    return this.#getLanguages();
  }

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
