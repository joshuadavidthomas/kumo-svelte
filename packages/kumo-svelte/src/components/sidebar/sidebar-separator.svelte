<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";

  export interface SidebarSeparatorProps
    extends Omit<HTMLAttributes<HTMLHRElement>, "class"> {
    class?: string;
  }

  let { class: className, ...restProps }: SidebarSeparatorProps = $props();
</script>

<hr
  data-sidebar="separator"
  class={cn("mx-2 h-px min-h-px border-0 bg-kumo-hairline", className)}
  {...restProps}
/>
