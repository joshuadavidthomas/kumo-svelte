<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface CollapsibleDefaultTriggerProps {
    children: Snippet;
    class?: string;
    disabled?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    disabled = false,
    id,
  }: CollapsibleDefaultTriggerProps = $props();
</script>

<CollapsiblePrimitive.Trigger
  {id}
  {disabled}
  class={cn(
    "bg-transparent border-none shadow-none p-0 m-0",
    "group flex cursor-pointer items-center gap-1 text-sm text-kumo-link select-none",
    className,
  )}
>
  {@render children()}
  <svg
    aria-hidden="true"
    viewBox="0 0 256 256"
    fill="currentColor"
    class="h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
  >
    <path
      d="M213.7 101.7l-80 80a8.2 8.2 0 0 1-11.4 0l-80-80a8 8 0 0 1 11.4-11.4L128 164.7l74.3-74.4a8 8 0 0 1 11.4 11.4Z"
    />
  </svg>
</CollapsiblePrimitive.Trigger>
