<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getDialogRoleContext } from "./context";
  import DialogOverlay from "./dialog-overlay.svelte";
  import DialogPortal from "./dialog-portal.svelte";
  import {
    KUMO_DIALOG_DEFAULT_VARIANTS,
    dialogVariants,
    type KumoDialogSize,
  } from "./variants";

  export interface DialogProps {
    children: Snippet;
    class?: string;
    container?: PortalProps["to"];
    size?: KumoDialogSize;
    style?: string;
    id?: string;
  }

  let {
    children,
    class: className,
    container,
    size = KUMO_DIALOG_DEFAULT_VARIANTS.size,
    style,
    id,
  }: DialogProps = $props();

  const role = getDialogRoleContext();
  const contentClass = $derived(cn(dialogVariants({ size }), className));
</script>

<DialogPortal to={container}>
  <DialogOverlay />
  {#if role === "alertdialog"}
    <AlertDialog.Content data-slot="dialog-content" {id} class={contentClass} {style}>
      {@render children()}
    </AlertDialog.Content>
  {:else}
    <DialogPrimitive.Content data-slot="dialog-content" {id} class={contentClass} {style}>
      {@render children()}
    </DialogPrimitive.Content>
  {/if}
</DialogPortal>
