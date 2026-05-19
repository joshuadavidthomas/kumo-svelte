import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_CODE_VARIANTS = {
  lang: {
    ts: {
      classes: "",
      description: "TypeScript code",
    },
    tsx: {
      classes: "",
      description: "TypeScript JSX code",
    },
    jsonc: {
      classes: "",
      description: "JSON with comments",
    },
    bash: {
      classes: "",
      description: "Shell/Bash commands",
    },
    css: {
      classes: "",
      description: "CSS styles",
    },
  },
} as const;

export const KUMO_CODE_DEFAULT_VARIANTS = {
  lang: "ts",
} as const;

export const KUMO_CODE_STYLING = {
  appearance: {
    background: "bg-transparent",
    border: "border-none",
    borderRadius: "rounded-none",
  },
  baseTokens: ["text-kumo-subtle"],
  dimensions: {
    margin: "m-0",
    padding: "p-0",
    width: "w-auto",
  },
  typography: {
    fontFamily: "font-mono",
    fontSize: "text-sm",
    lineHeight: "leading-[20px]",
  },
} as const;

export const KUMO_CODEBLOCK_STYLING = {
  baseTokens: ["bg-kumo-base", "border-kumo-fill"],
  container: {
    background: "bg-kumo-base",
    border: "border border-kumo-fill",
    borderRadius: "rounded-md",
    minWidth: "min-w-0",
  },
  dimensions: {
    borderRadius: 6,
    padding: 10,
  },
  innerPadding: "[&>pre]:p-2.5",
} as const;

export type KumoCodeLang = keyof typeof KUMO_CODE_VARIANTS.lang;
export type CodeLang = KumoCodeLang;
export type BundledLanguage = CodeLang;

export interface KumoCodeVariantsProps {
  lang?: KumoCodeLang;
}

export function codeVariants({
  lang = KUMO_CODE_DEFAULT_VARIANTS.lang,
}: KumoCodeVariantsProps = {}) {
  return cn(
    "m-0 w-auto rounded-none border-none bg-transparent p-0 font-mono text-sm leading-[20px] text-kumo-subtle",
    resolveVariant(KUMO_CODE_VARIANTS.lang, lang, KUMO_CODE_DEFAULT_VARIANTS.lang).classes,
  );
}
