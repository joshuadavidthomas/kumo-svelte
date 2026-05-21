<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import { setDialogRoleContext } from "./context";
  import {
    KUMO_DIALOG_DEFAULT_VARIANTS,
    type KumoDialogRole,
  } from "./variants";

  export interface DialogRootProps {
    children: Snippet;
    role?: KumoDialogRole;
    disablePointerDismissal?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    children,
    role = KUMO_DIALOG_DEFAULT_VARIANTS.role,
    disablePointerDismissal = false,
    open = $bindable(false),
    onOpenChange,
  }: DialogRootProps = $props();

  setDialogRoleContext({
    get role() {
      return role;
    },
    get disablePointerDismissal() {
      return disablePointerDismissal;
    },
  });
</script>

{#if role === "alertdialog"}
  <AlertDialog.Root bind:open {onOpenChange}>
    {@render children()}
  </AlertDialog.Root>
{:else}
  <DialogPrimitive.Root bind:open {onOpenChange}>
    {@render children()}
  </DialogPrimitive.Root>
{/if}
