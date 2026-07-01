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
        "flex h-[58px] shrink-0 items-center gap-1 overflow-hidden border-b border-kumo-line px-3",
        className,
      );
    }
    if (section === "content") {
      return cn(
        "relative min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-[11px] py-3 group-not-data-[state=collapsed]/sidebar:px-3.5",
        "transition-[padding] duration-(--sidebar-animation-duration)",
        "[mask-image:linear-gradient(to_bottom,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]",
        className,
      );
    }
    return cn(
      "sticky bottom-0 flex h-12 w-(--sidebar-width) shrink-0 items-center gap-4 overflow-hidden whitespace-nowrap border-t border-kumo-line bg-(--sidebar-bg)",
      "px-[11px] group-not-data-[state=collapsed]/sidebar:px-4",
      "transition-[width,padding] duration-(--sidebar-animation-duration) ease-(--sidebar-easing)",
      "motion-reduce:transition-none",
      "group-data-[state=collapsed]/sidebar:w-(--sidebar-width-icon) group-data-[state=collapsed]/sidebar:border-r group-data-[state=collapsed]/sidebar:border-kumo-line group-data-[state=collapsed]/sidebar:bg-clip-padding",
      className,
    );
  });
</script>

<div data-sidebar={section} class={sectionClass} {...restProps}>
  {@render children?.()}
</div>
