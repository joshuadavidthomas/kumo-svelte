<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { getInputGroupContext, INPUT_GROUP_SIZE } from "./context";

  export interface InputGroupAddonProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    align?: "start" | "end";
    children?: Snippet;
    class?: string;
    containsButton?: boolean;
  }

  let {
    align = "start",
    children,
    class: className,
    containsButton = false,
    ...restProps
  }: InputGroupAddonProps = $props();

  const group = getInputGroupContext("Addon");
  let size = $derived(group?.size ?? "base");
  let tokens = $derived(INPUT_GROUP_SIZE[size]);
</script>

<div
  data-slot={align === "start" ? "input-group-addon-start" : "input-group-addon-end"}
  class={cn(
    "pointer-events-none relative z-[1] flex shrink-0 items-center gap-1.5 text-kumo-subtle",
    tokens.fontSize,
    tokens.iconSizeClass,
    "*:pointer-events-auto",
    align === "start"
      ? cn(
          "-order-1 pr-0",
          containsButton ? tokens.addonButtonOuterStart : tokens.addonOuterStart,
        )
      : cn("order-1 pl-0", containsButton ? tokens.addonButtonOuterEnd : tokens.addonOuterEnd),
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>

