<script lang="ts">
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getDialogRoleContext } from "./context";

  export type DialogOverlayProps = DialogPrimitive.OverlayProps;

  let { class: className, ...restProps }: DialogOverlayProps = $props();

  const role = getDialogRoleContext();
  const overlayClass = $derived(
    cn(
      "fixed inset-0 z-40 bg-kumo-recessed opacity-80 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
      className,
    ),
  );
</script>

{#if role === "alertdialog"}
  <AlertDialog.Overlay data-slot="dialog-overlay" class={overlayClass} {...restProps} />
{:else}
  <DialogPrimitive.Overlay data-slot="dialog-overlay" class={overlayClass} {...restProps} />
{/if}
