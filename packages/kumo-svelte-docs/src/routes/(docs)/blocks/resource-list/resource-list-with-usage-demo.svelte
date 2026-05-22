<script lang="ts">
  import { CodeBlock } from "kumo-svelte/components/code";
  import { Surface } from "kumo-svelte/components/surface";
  import ResourceListDemoShell from "./resource-list-demo-shell.svelte";

  const command = 'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.example.com';
</script>

<ResourceListDemoShell title="API Keys" description="Create and manage API keys for your applications">
  {#snippet usage()}
    <Surface class="p-4">
      <h3 class="mb-2 font-semibold">Quick Start</h3>
      <p class="mb-3 text-sm text-kumo-subtle">Generate an API key to authenticate your requests.</p>
      <CodeBlock lang="bash" code={command} />
    </Surface>
  {/snippet}
  <Surface class="p-6">
    <p>API keys list would appear here.</p>
  </Surface>
</ResourceListDemoShell>
