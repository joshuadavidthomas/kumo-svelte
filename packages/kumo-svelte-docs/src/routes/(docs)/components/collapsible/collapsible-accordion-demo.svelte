<script lang="ts">
  import { Collapsible, CollapsibleDefaultPanel, CollapsibleDefaultTrigger, Text } from "kumo-svelte";

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
    <Collapsible
      open={activeIndex === index}
      onOpenChange={(open) => {
        activeIndex = open ? index : null;
      }}
    >
      <CollapsibleDefaultTrigger>{item.title}</CollapsibleDefaultTrigger>
      <CollapsibleDefaultPanel>
        <Text>{item.content}</Text>
      </CollapsibleDefaultPanel>
    </Collapsible>
  {/each}
</div>
