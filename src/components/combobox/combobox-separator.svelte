<script lang="ts">
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface ComboboxSeparatorProps {
    class?: string;
  }

  let { class: className }: ComboboxSeparatorProps = $props();
</script>

<ComboboxPrimitive.Separator class={cn("mx-0 my-1 h-px bg-kumo-line", className)} />
