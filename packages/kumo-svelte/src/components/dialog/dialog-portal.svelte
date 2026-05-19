<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";
  import { getDialogRoleContext } from "./context";

  export interface DialogPortalProps {
    children?: Snippet;
    to?: PortalProps["to"];
  }

  let { children, to }: DialogPortalProps = $props();

  const role = getDialogRoleContext();
  const portalContext = getKumoPortalContext();
  let portalContainer = $derived(to ?? portalContext.container);
</script>

{#if role === "alertdialog"}
  <AlertDialog.Portal to={portalContainer}>
    {@render children?.()}
  </AlertDialog.Portal>
{:else}
  <DialogPrimitive.Portal to={portalContainer}>
    {@render children?.()}
  </DialogPrimitive.Portal>
{/if}
