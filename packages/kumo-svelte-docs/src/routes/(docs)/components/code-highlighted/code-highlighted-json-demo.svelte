<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  const code = `{
  "name": "kumo-svelte-app",
  "dependencies": {
    "kumo-svelte": "latest",
    "shiki": "^4.0.0"
  }
}`;
</script>

<ShikiDemoProvider>
  <CodeHighlighted {code} lang="json" />
</ShikiDemoProvider>
