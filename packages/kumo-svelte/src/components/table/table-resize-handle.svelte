<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface TableResizeHandleProps extends Omit<HTMLButtonAttributes, "children"> {
    class?: string;
  }

  let { class: className, type = "button", ...restProps }: TableResizeHandleProps = $props();
</script>

<button
  {type}
  aria-label="Resize column"
  class={cn(
    "invisible h-full group-hover:visible",
    "w-[10px]",
    "flex items-center justify-center",
    "cursor-col-resize touch-none select-none",
    "absolute top-0 right-0",
    "m-0 bg-kumo-base p-0",
    "focus-visible:ring-2 focus-visible:ring-kumo-brand",
    className,
  )}
  {...restProps}
>
  <span class="h-5 w-[2px] rounded bg-kumo-hairline"></span>
</button>
