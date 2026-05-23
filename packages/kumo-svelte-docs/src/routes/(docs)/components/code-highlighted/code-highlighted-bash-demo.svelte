<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/components/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  const code = `# Install Kumo Svelte
pnpm add kumo-svelte

# Start development server
pnpm dev`;
</script>

<ShikiDemoProvider>
  <CodeHighlighted {code} lang="bash" />
</ShikiDemoProvider>
