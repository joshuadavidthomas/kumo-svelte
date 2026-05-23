<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/components/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  const code = "pnpm add kumo-svelte";
</script>

<ShikiDemoProvider>
  <CodeHighlighted {code} lang="bash" showCopyButton />
</ShikiDemoProvider>
