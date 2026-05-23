import type { ComponentProps } from "svelte";
import CodeBlockComponent from "./code-block.svelte";
import CodeComponent from "./code.svelte";

export {
  CodeComponent as Code,
  CodeComponent as CodeRoot,
  CodeComponent as Root,
  CodeBlockComponent as CodeBlock,
  CodeBlockComponent as Block,
};

export { default as CodeHighlighted } from "./code-highlighted.svelte";
export { default as ShikiProvider } from "./shiki-provider.svelte";
export { useShikiHighlighter } from "./use-shiki-highlighter";

export type CodeProps = ComponentProps<typeof CodeComponent>;
export type CodeRootProps = CodeProps;
export type CodeBlockProps = ComponentProps<typeof CodeBlockComponent>;

export type {
  CodeHighlightedLabels,
  CodeHighlightedProps,
  ShikiEngine,
  ShikiProviderProps,
  SupportedLanguage,
  UseShikiHighlighterResult,
} from "./types";

export {
  codeVariants,
  KUMO_CODEBLOCK_STYLING,
  KUMO_CODE_DEFAULT_VARIANTS,
  KUMO_CODE_STYLING,
  KUMO_CODE_VARIANTS,
  type BundledLanguage,
  type CodeLang,
  type KumoCodeLang,
  type KumoCodeVariantsProps,
} from "./variants";
