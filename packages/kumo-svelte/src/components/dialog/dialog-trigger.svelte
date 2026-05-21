<script lang="ts">
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import { getDialogRoleContext } from "./context";

  export type DialogTriggerProps = DialogPrimitive.TriggerProps;

  let { children, ...restProps }: DialogTriggerProps = $props();

  const role = getDialogRoleContext();
</script>

{#if role === "alertdialog"}
  <AlertDialog.Trigger data-slot="dialog-trigger" {...restProps}>
    {@render children?.()}
  </AlertDialog.Trigger>
{:else}
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...restProps}>
    {@render children?.()}
  </DialogPrimitive.Trigger>
{/if}
