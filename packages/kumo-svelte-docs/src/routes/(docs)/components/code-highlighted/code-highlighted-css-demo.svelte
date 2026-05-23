<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/components/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  const code = `.button {
  background: var(--color-brand);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  &:hover {
    background: var(--color-brand-hover);
  }
}`;
</script>

<ShikiDemoProvider>
  <CodeHighlighted {code} lang="css" />
</ShikiDemoProvider>
