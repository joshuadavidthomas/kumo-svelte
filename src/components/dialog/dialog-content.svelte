<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";
  import { getDialogRoleContext } from "./context";
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
  const portalContext = getKumoPortalContext();
  const contentClass = $derived(cn(dialogVariants({ size }), className));
  let portalContainer = $derived(container ?? portalContext.container);
</script>

{#if role === "alertdialog"}
  <AlertDialog.Portal to={portalContainer}>
    <AlertDialog.Overlay
      class="fixed inset-0 z-40 bg-kumo-recessed opacity-80 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
    />
    <AlertDialog.Content {id} class={contentClass} {style}>
      {@render children()}
    </AlertDialog.Content>
  </AlertDialog.Portal>
{:else}
  <DialogPrimitive.Portal to={portalContainer}>
    <DialogPrimitive.Overlay
      class="fixed inset-0 z-40 bg-kumo-recessed opacity-80 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
    />
    <DialogPrimitive.Content {id} class={contentClass} {style}>
      {@render children()}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
{/if}
