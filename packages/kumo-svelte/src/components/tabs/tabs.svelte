<script lang="ts">
  import type { ComponentProps } from "svelte";
  import TabsRoot from "./tabs-root.svelte";

  export type TabsProps = ComponentProps<typeof TabsRoot>;

  let { children, value = $bindable(""), ...restProps }: TabsProps = $props();
</script>

<TabsRoot bind:value {...restProps}>
  {@render children?.()}
</TabsRoot>
