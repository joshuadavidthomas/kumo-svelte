<script lang="ts">
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import { getDialogRoleContext } from "./context";

  export type DialogCloseProps = DialogPrimitive.CloseProps;

  let { children, ...restProps }: DialogCloseProps = $props();

  const role = getDialogRoleContext();
</script>

{#if role === "alertdialog"}
  <AlertDialog.Cancel data-slot="dialog-close" {...restProps}>
    {@render children?.()}
  </AlertDialog.Cancel>
{:else}
  <DialogPrimitive.Close data-slot="dialog-close" {...restProps}>
    {@render children?.()}
  </DialogPrimitive.Close>
{/if}
