<script lang="ts">
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type TabsRootProps = TabsPrimitive.RootProps;

  let { children, class: className, value = $bindable(""), ...restProps }: TabsRootProps =
    $props();
</script>

<TabsPrimitive.Root
  bind:value
  data-slot="tabs"
  class={cn("relative isolate min-w-0 font-medium", className)}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Root>
