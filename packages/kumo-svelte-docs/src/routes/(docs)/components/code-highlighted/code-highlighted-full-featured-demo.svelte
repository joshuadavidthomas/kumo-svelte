<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/components/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  const code = `<script lang="ts">
  import { CodeHighlighted, ShikiProvider } from "kumo-svelte/components/code";

  const code = "const answer = 42;";
<\/script>

<ShikiProvider engine="javascript" languages={["typescript", "bash"]}>
  <CodeHighlighted
    {code}
    lang="typescript"
    showCopyButton
    highlightLines={[1]}
  />
</ShikiProvider>`;
</script>

<ShikiDemoProvider>
  <CodeHighlighted {code} lang="html" showCopyButton highlightLines={[7, 8, 9, 10, 11, 12]} />
</ShikiDemoProvider>
