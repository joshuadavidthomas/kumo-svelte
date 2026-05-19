<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  const code = `function processData(items: string[]) {
  // Filter out empty items
  const filtered = items.filter(Boolean);

  // Transform to uppercase (highlighted)
  const transformed = filtered.map((item) => item.toUpperCase());

  // Return sorted result
  return transformed.toSorted();
}`;
</script>

<ShikiDemoProvider>
  <CodeHighlighted {code} lang="typescript" highlightLines={[5, 6]} />
</ShikiDemoProvider>
