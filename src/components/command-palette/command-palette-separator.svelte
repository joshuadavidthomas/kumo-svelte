<script lang="ts">
  import { Command as CommandPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface CommandPaletteSeparatorProps {
    class?: string;
    forceMount?: boolean;
  }

  let {
    class: className,
    forceMount,
  }: CommandPaletteSeparatorProps = $props();
</script>

<CommandPrimitive.Separator
  data-slot="command-palette-separator"
  {forceMount}
  class={cn("-mx-1 my-1 h-px bg-kumo-line", className)}
/>
