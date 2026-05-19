import type { ComponentProps } from "svelte";
import CodeBlockComponent from "./code-block.svelte";
import CodeComponent from "./code.svelte";

export { default as Code } from "./code.svelte";
export { default as CodeBlock } from "./code-block.svelte";

export type CodeProps = ComponentProps<typeof CodeComponent>;
export type CodeBlockProps = ComponentProps<typeof CodeBlockComponent>;

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
