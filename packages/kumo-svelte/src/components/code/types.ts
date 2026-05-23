import type { Snippet } from "svelte";

export type SupportedLanguage =
  | "javascript"
  | "typescript"
  | "jsx"
  | "tsx"
  | "json"
  | "jsonc"
  | "html"
  | "css"
  | "python"
  | "yaml"
  | "markdown"
  | "graphql"
  | "sql"
  | "bash"
  | "shell"
  | "diff"
  | "hcl"
  | "toml";

export type ShikiEngine = "javascript" | "wasm";

export interface CodeHighlightedLabels {
  copy?: string;
  copied?: string;
}

export interface ShikiProviderProps {
  children?: Snippet;
  engine: ShikiEngine;
  labels?: CodeHighlightedLabels;
  languages: SupportedLanguage[];
}

export interface UseShikiHighlighterResult {
  error: Error | null;
  highlight: (code: string, lang: SupportedLanguage) => string | null;
  isLoading: boolean;
  isReady: boolean;
  labels: Required<CodeHighlightedLabels>;
}

export interface CodeHighlightedProps {
  class?: string;
  code: string;
  highlightLines?: number[];
  labels?: CodeHighlightedLabels;
  lang: SupportedLanguage;
  showCopyButton?: boolean;
  showLineNumbers?: boolean;
}

export type BundledLanguage = SupportedLanguage;
