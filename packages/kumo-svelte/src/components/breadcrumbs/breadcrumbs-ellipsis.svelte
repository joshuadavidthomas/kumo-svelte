<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface BreadcrumbsEllipsisProps
    extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    class?: string;
  }

  let {
    class: className,
    ...restProps
  }: BreadcrumbsEllipsisProps = $props();
</script>

<span
  data-slot="breadcrumbs-ellipsis"
  class={cn("flex shrink-0 items-center text-kumo-subtle", className)}
  aria-hidden="true"
  {...restProps}
>
  ...
</span>
