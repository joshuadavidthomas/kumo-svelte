<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/components/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";
</script>

<ShikiDemoProvider>
  <div class="space-y-4">
    <CodeHighlighted code={`const config = { theme: "dark" };`} lang="typescript" />
    <CodeHighlighted code="pnpm run build" lang="bash" />
    <CodeHighlighted code={`{ "success": true }`} lang="json" />
  </div>
</ShikiDemoProvider>
