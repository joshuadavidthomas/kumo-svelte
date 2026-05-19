<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    codeVariants,
    KUMO_CODE_DEFAULT_VARIANTS,
    type KumoCodeLang,
  } from "./variants";

  export interface CodeProps extends Omit<HTMLAttributes<HTMLPreElement>, "class" | "children"> {
    class?: string;
    code: string;
    lang?: KumoCodeLang;
    values?: Record<string, { highlight?: boolean; value: string }>;
  }

  let {
    class: className,
    code,
    lang = KUMO_CODE_DEFAULT_VARIANTS.lang,
    values: _values,
    ...restProps
  }: CodeProps = $props();
</script>

<pre class={cn(codeVariants({ lang }), className)} {...restProps}>{code}</pre>
