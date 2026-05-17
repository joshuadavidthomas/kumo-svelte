import type { HighlighterCore, LanguageInput } from "shiki/core";
import type { CodeHighlightedLabels, ShikiEngine, SupportedLanguage } from "./types";

export const DEFAULT_CODE_HIGHLIGHTED_LABELS = {
  copy: "Copy",
  copied: "Copied!",
} satisfies Required<CodeHighlightedLabels>;

const BUNDLED_LANGS: Record<SupportedLanguage, () => Promise<{ default: unknown }>> = {
  javascript: () => import("@shikijs/langs/javascript"),
  typescript: () => import("@shikijs/langs/typescript"),
  jsx: () => import("@shikijs/langs/jsx"),
  tsx: () => import("@shikijs/langs/tsx"),
  json: () => import("@shikijs/langs/json"),
  jsonc: () => import("@shikijs/langs/jsonc"),
  html: () => import("@shikijs/langs/html"),
  css: () => import("@shikijs/langs/css"),
  python: () => import("@shikijs/langs/python"),
  yaml: () => import("@shikijs/langs/yaml"),
  markdown: () => import("@shikijs/langs/markdown"),
  graphql: () => import("@shikijs/langs/graphql"),
  sql: () => import("@shikijs/langs/sql"),
  bash: () => import("@shikijs/langs/bash"),
  shell: () => import("@shikijs/langs/shellscript"),
  diff: () => import("@shikijs/langs/diff"),
  hcl: () => import("@shikijs/langs/hcl"),
  toml: () => import("@shikijs/langs/toml"),
};

export interface CreateKumoHighlighterOptions {
  engine?: ShikiEngine;
  languages: SupportedLanguage[];
}

export async function createKumoHighlighter({
  engine = "javascript",
  languages,
}: CreateKumoHighlighterOptions): Promise<HighlighterCore> {
  const { createHighlighterCore } = await import("shiki/core");

  const engineInstance =
    engine === "wasm"
      ? await import("shiki/engine/oniguruma").then((module) =>
          module.createOnigurumaEngine(import("shiki/wasm")),
        )
      : await import("shiki/engine/javascript").then((module) =>
          module.createJavaScriptRegexEngine(),
        );

  const [githubLight, vesper] = await Promise.all([
    import("@shikijs/themes/github-light"),
    import("@shikijs/themes/vesper"),
  ]);
  const validLanguages = languages.filter((lang) => lang in BUNDLED_LANGS);
  const langModules = await Promise.all(validLanguages.map((lang) => BUNDLED_LANGS[lang]()));

  return createHighlighterCore({
    engine: engineInstance,
    langs: langModules.map((module) => module.default) as LanguageInput[],
    themes: [githubLight.default, vesper.default],
  });
}

export function highlightWithKumoThemes(
  highlighter: HighlighterCore,
  code: string,
  lang: SupportedLanguage,
) {
  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      dark: "vesper",
      light: "github-light",
    },
  });
}

export function processHighlightedHtml(html: string, highlightLines?: number[]) {
  if (!highlightLines?.length) return html;

  const highlightSet = new Set(highlightLines);
  let lineNumber = 0;

  return html.replace(/<span class="line">/g, () => {
    lineNumber++;
    return highlightSet.has(lineNumber)
      ? '<span class="line line-highlighted">'
      : '<span class="line">';
  });
}
