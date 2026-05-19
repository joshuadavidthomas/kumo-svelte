<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface SelectSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

  let { class: className, ...restProps }: SelectSeparatorProps = $props();
</script>

<div
  data-slot="select-separator"
  role="separator"
  class={cn("-mx-1 my-1 h-px bg-kumo-hairline", className)}
  {...restProps}
></div>
