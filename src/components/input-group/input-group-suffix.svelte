<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { getInputGroupContext, INPUT_GROUP_SIZE } from "./context";

  export interface InputGroupSuffixProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
    ...restProps
  }: InputGroupSuffixProps = $props();

  const group = getInputGroupContext("Suffix");
  let size = $derived(group?.size ?? "base");
  let tokens = $derived(INPUT_GROUP_SIZE[size]);
</script>

<div
  data-slot="input-group-suffix"
  class={cn(
    "pointer-events-none flex min-w-0 grow select-none items-center text-kumo-subtle",
    tokens.fontSize,
    tokens.suffixPad,
    className,
  )}
  {...restProps}
>
  <span class="truncate">{@render children?.()}</span>
</div>

