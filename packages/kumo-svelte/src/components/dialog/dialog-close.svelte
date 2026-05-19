<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import { getDialogRoleContext } from "./context";

  export interface DialogCloseProps {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    disabled = false,
    id,
  }: DialogCloseProps = $props();

  const role = getDialogRoleContext();
</script>

{#if role === "alertdialog"}
  <AlertDialog.Cancel data-slot="dialog-close" {id} {disabled} class={className}>
    {@render children?.()}
  </AlertDialog.Cancel>
{:else}
  <DialogPrimitive.Close data-slot="dialog-close" {id} {disabled} class={className}>
    {@render children?.()}
  </DialogPrimitive.Close>
{/if}
