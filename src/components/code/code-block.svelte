<script lang="ts">
  import Code from "./code.svelte";
  import type { CodeLang } from "./variants";

  export interface CodeBlockProps {
    code: string;
    lang?: CodeLang;
  }

  let { code, lang }: CodeBlockProps = $props();
</script>

<div class="min-w-0 rounded-md border border-kumo-fill bg-kumo-base [&>pre]:p-2.5!">
  <Code {code} {lang} />
</div>
