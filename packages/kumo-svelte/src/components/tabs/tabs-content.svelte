<script lang="ts">
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type TabsContentProps = TabsPrimitive.ContentProps;

  let { class: className, ...restProps }: TabsContentProps = $props();
</script>

<TabsPrimitive.Content
  data-slot="tabs-content"
  class={cn("flex-1 outline-none", className)}
  {...restProps}
/>
