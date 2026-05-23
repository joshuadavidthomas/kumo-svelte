<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/components/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  const code = `const statusLabels = {
  active: "Active",
  paused: "Paused",
  errored: "Errored",
};

export function getStatusLabel(status: keyof typeof statusLabels) {
  return statusLabels[status];
}`;
</script>

<ShikiDemoProvider>
  <CodeHighlighted {code} lang="typescript" showLineNumbers />
</ShikiDemoProvider>
