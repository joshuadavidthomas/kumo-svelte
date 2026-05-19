<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getDialogRoleContext } from "./context";

  export interface DialogTriggerProps {
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
  }: DialogTriggerProps = $props();

  const role = getDialogRoleContext();
</script>

{#if role === "alertdialog"}
  <AlertDialog.Trigger data-slot="dialog-trigger" {id} {disabled} class={className}>
    {@render children?.()}
  </AlertDialog.Trigger>
{:else}
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {id} {disabled} class={className}>
    {@render children?.()}
  </DialogPrimitive.Trigger>
{/if}
