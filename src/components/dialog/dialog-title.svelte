<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog, Dialog as DialogPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getDialogRoleContext } from "./context";

  export interface DialogTitleProps {
    children: Snippet;
    class?: string;
    id?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
  }

  let {
    children,
    class: className,
    id,
    level = 2,
  }: DialogTitleProps = $props();

  const role = getDialogRoleContext();
  const titleClass = $derived(cn("text-xl font-semibold text-kumo-default", className));
</script>

{#if role === "alertdialog"}
  <AlertDialog.Title {id} {level} class={titleClass}>
    {@render children()}
  </AlertDialog.Title>
{:else}
  <DialogPrimitive.Title {id} {level} class={titleClass}>
    {@render children()}
  </DialogPrimitive.Title>
{/if}
