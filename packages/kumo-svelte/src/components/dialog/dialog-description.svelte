<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getDialogRoleContext } from "./context";

  export interface DialogDescriptionProps {
    children: Snippet;
    class?: string;
    id?: string;
  }

  let {
    children,
    class: className,
    id,
  }: DialogDescriptionProps = $props();

  const role = getDialogRoleContext();
  const descriptionClass = $derived(cn("text-base text-kumo-subtle", className));
</script>

{#if role === "alertdialog"}
  <AlertDialog.Description data-slot="dialog-description" {id} class={descriptionClass}>
    {@render children()}
  </AlertDialog.Description>
{:else}
  <DialogPrimitive.Description data-slot="dialog-description" {id} class={descriptionClass}>
    {@render children()}
  </DialogPrimitive.Description>
{/if}
