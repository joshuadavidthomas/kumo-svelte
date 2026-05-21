<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getDialogContext } from "./context";
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

  const dialogContext = getDialogContext();
  const role = $derived(dialogContext.role);
  const contentClass = $derived(cn(dialogVariants({ size }), className));
  const baseStyle =
    "transition-property: scale, opacity; transition-timing-function: var(--default-transition-timing-function); --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.03), 0 8px 10px -6px rgb(0 0 0 / 0.03)";
  const contentStyle = $derived(style ? `${baseStyle}; ${style}` : baseStyle);
  const interactOutsideBehavior = $derived(dialogContext.disablePointerDismissal ? "ignore" : undefined);
</script>

<DialogPortal to={container}>
  <DialogOverlay />
  {#if role === "alertdialog"}
    <AlertDialog.Content data-slot="dialog-content" {id} class={contentClass} style={contentStyle}>
      {@render children()}
    </AlertDialog.Content>
  {:else}
    <DialogPrimitive.Content
      data-slot="dialog-content"
      {id}
      class={contentClass}
      style={contentStyle}
      {interactOutsideBehavior}
    >
      {@render children()}
    </DialogPrimitive.Content>
  {/if}
</DialogPortal>
