<script lang="ts">
  import { Text } from "kumo-svelte/components/text";
  import * as Collapsible from "kumo-svelte/components/collapsible";
  const items = [
    {
      title: "What is Kumo?",
      content: "Kumo is Cloudflare's new design system built on accessibility primitives and Tailwind CSS.",
    },
    {
      title: "How do I install it?",
      content: "Run `pnpm add kumo-svelte` and import the components you need.",
    },
    {
      title: "Is it accessible?",
      content: "Yes. Kumo builds on primitive components that provide keyboard and ARIA behavior.",
    },
  ];

  let activeIndex = $state<number | null>(0);
</script>

<div class="w-full space-y-2">
  {#each items as item, index}
    <Collapsible.Root
      open={activeIndex === index}
      onOpenChange={(open) => {
        activeIndex = open ? index : null;
      }}
    >
      <Collapsible.DefaultTrigger>{item.title}</Collapsible.DefaultTrigger>
      <Collapsible.DefaultPanel>
        <Text>{item.content}</Text>
      </Collapsible.DefaultPanel>
    </Collapsible.Root>
  {/each}
</div>
