<script lang="ts">
  import { CodeHighlighted } from "kumo-svelte/code";
  import ShikiDemoProvider from "./shiki-demo-provider.svelte";

  let hue = $state(220);
  let opacity = $state(10);

  let lightBg = $derived(`hsla(${hue}, 80%, 50%, ${opacity / 100})`);
  let darkBg = $derived(`hsla(${hue}, 60%, 70%, ${(opacity + 5) / 100})`);

  const code = `function greet(name: string) {
  // This line is highlighted
  console.log(\`Hello, \${name}!\`);

  return name.toUpperCase();
}`;
</script>

<ShikiDemoProvider>
  <div class="space-y-4">
    <style>
      {`#custom-highlight-demo .kumo-shiki {
        --kumo-code-highlight-bg: ${lightBg};
      }
      [data-mode="dark"] #custom-highlight-demo .kumo-shiki {
        --kumo-code-highlight-bg: ${darkBg};
      }`}
    </style>

    <div id="custom-highlight-demo">
      <CodeHighlighted {code} lang="typescript" highlightLines={[2, 3]} />
    </div>

    <div class="flex flex-wrap gap-6 rounded-md border border-kumo-hairline bg-kumo-elevated p-4">
      <label class="flex flex-col gap-2">
        <span class="text-sm text-kumo-subtle">Hue: {hue}°</span>
        <input type="range" min="0" max="360" bind:value={hue} class="w-32" />
      </label>

      <label class="flex flex-col gap-2">
        <span class="text-sm text-kumo-subtle">Opacity: {opacity}%</span>
        <input type="range" min="2" max="30" bind:value={opacity} class="w-32" />
      </label>

      <div class="flex flex-col gap-2">
        <span class="text-sm text-kumo-subtle">CSS Variable</span>
        <code class="rounded bg-kumo-control px-2 py-1 font-mono text-xs">
          --kumo-code-highlight-bg: {lightBg}
        </code>
      </div>
    </div>
  </div>
</ShikiDemoProvider>
