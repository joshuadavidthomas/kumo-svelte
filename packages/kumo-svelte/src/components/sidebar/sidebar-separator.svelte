<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";

  export interface SidebarSeparatorProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    class?: string;
  }

  let { class: className, ...restProps }: SidebarSeparatorProps = $props();
</script>

<div data-sidebar="separator" class={cn("my-3 px-2", className)} {...restProps}>
  <div class="border-b border-kumo-line"></div>
</div>
