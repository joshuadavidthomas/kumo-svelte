<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";

  export interface SidebarSectionProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "class"> {
    children?: Snippet;
    class?: string;
    section: "content" | "footer" | "header";
  }

  let { children, class: className, section, ...restProps }: SidebarSectionProps = $props();

  let sectionClass = $derived.by(() => {
    if (section === "header") {
      return cn(
        "flex items-center gap-2 border-b border-kumo-hairline px-2 py-3",
        "overflow-hidden group-data-[state=collapsed]/sidebar:border-b-0",
      );
    }
    if (section === "content") {
      return cn(
        "flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden px-2 py-2",
        "group-data-[state=collapsed]/sidebar:gap-0 group-data-[state=collapsed]/sidebar:overflow-x-hidden group-data-[state=collapsed]/sidebar:py-0",
      );
    }
    return cn(
      "flex min-w-0 flex-col gap-2 border-t border-kumo-hairline px-2 py-2",
      "group-data-[state=collapsed]/sidebar:border-t-0 group-data-[state=collapsed]/sidebar:py-1",
    );
  });
</script>

<div data-sidebar={section} class={cn(sectionClass, className)} {...restProps}>
  {@render children?.()}
</div>
