import { createKumoHighlighter, highlightWithKumoThemes } from "./shared";
import type { ComponentProps } from "svelte";
import CodeBlockComponent from "./code-block.svelte";
import type { ShikiEngine, SupportedLanguage } from "./types";

export interface HighlightCodeOptions {
  engine?: ShikiEngine;
}

export interface CreateServerHighlighterOptions {
  engine?: ShikiEngine;
  languages: SupportedLanguage[];
}

export interface ServerHighlighter {
  dispose: () => void;
  highlight: (code: string, lang: SupportedLanguage) => string;
}

export async function highlightCode(
  code: string,
  lang: SupportedLanguage,
  options: HighlightCodeOptions = {},
): Promise<string> {
  const highlighter = await createKumoHighlighter({
    engine: options.engine,
    languages: [lang],
  });

  try {
    return highlightWithKumoThemes(highlighter, code, lang);
  } finally {
    highlighter.dispose();
  }
}

export async function createServerHighlighter({
  engine,
  languages,
}: CreateServerHighlighterOptions): Promise<ServerHighlighter> {
  const highlighter = await createKumoHighlighter({ engine, languages });

  return {
    dispose: () => {
      highlighter.dispose();
    },
    highlight: (code, lang) => highlightWithKumoThemes(highlighter, code, lang),
  };
}

export { default as CodeBlock } from "./code-block.svelte";
export type CodeBlockProps = ComponentProps<typeof CodeBlockComponent>;
