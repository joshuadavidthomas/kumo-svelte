import type { ComponentProps } from "svelte";
import CodeBlockComponent from "./code-block.svelte";
import CodeComponent from "./code.svelte";

const Code = Object.assign(CodeComponent, {
  Root: CodeComponent,
  Block: CodeBlockComponent,
});

export {
  Code,
  CodeComponent as CodeRoot,
  CodeComponent as Root,
  CodeBlockComponent as CodeBlock,
  CodeBlockComponent as Block,
};

export type CodeProps = ComponentProps<typeof CodeComponent>;
export type CodeRootProps = CodeProps;
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
