<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/components/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  const code = `<script lang="ts">
  let count = $state(0);
<\/script>

<button onclick={() => count += 1}>
  Count: {count}
</button>`;
</script>

<ShikiDemoProvider>
  <CodeHighlighted {code} lang="html" />
</ShikiDemoProvider>
