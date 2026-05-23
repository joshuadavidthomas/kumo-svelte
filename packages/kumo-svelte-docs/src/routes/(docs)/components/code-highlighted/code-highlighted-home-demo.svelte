<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/components/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  const code = `const sum = (a: number, b: number) => {\n  return a + b;\n};`;
</script>

<ShikiDemoProvider>
  <CodeHighlighted {code} lang="typescript" />
</ShikiDemoProvider>
