<script lang="ts">
  import type { Snippet } from "svelte";
  import DialogContent from "../dialog/dialog-content.svelte";
  import DialogRoot from "../dialog/dialog-root.svelte";
  import { cn } from "../../utils/cn";

  export interface CommandPaletteDialogProps {
    children?: Snippet;
    class?: string;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
  }

  let {
    children,
    class: className,
    onOpenChange,
    open = $bindable(false),
  }: CommandPaletteDialogProps = $props();
</script>

<DialogRoot bind:open {onOpenChange}>
  <DialogContent
    size="lg"
    class={cn(
      "top-[10vh] max-w-2xl overflow-hidden rounded-lg p-0",
      "duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
      className,
    )}
  >
    {@render children?.()}
  </DialogContent>
</DialogRoot>
