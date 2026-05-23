<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/components/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  const code = `const greeting = "Hello, World!";
console.log(greeting);`;
</script>

<ShikiDemoProvider>
  <CodeHighlighted {code} lang="typescript" />
</ShikiDemoProvider>
