<script lang="ts">
  import { onMount, type Snippet } from "svelte";
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

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted}
  <DialogRoot bind:open {onOpenChange}>
    <DialogContent
      size="lg"
      class={cn(
        "top-[10vh] w-full !max-w-2xl min-w-0 translate-y-0 overflow-hidden rounded-lg p-0 shadow-xs sm:w-full sm:!max-w-2xl sm:min-w-0",
        "duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
        className,
      )}
    >
      {@render children?.()}
    </DialogContent>
  </DialogRoot>
{/if}
