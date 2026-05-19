<script lang="ts">
  import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface BreadcrumbsSeparatorProps
    extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    class?: string;
  }

  let {
    class: className,
    ...restProps
  }: BreadcrumbsSeparatorProps = $props();
</script>

<span
  data-slot="breadcrumbs-separator"
  class={cn("flex shrink-0 items-center text-kumo-inactive", className)}
  aria-hidden="true"
  {...restProps}
>
  <CaretRightIcon size={24} />
</span>
