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
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    children,
    role = KUMO_DIALOG_DEFAULT_VARIANTS.role,
    open = $bindable(false),
    onOpenChange,
  }: DialogRootProps = $props();

  setDialogRoleContext({
    get role() {
      return role;
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
