<script lang="ts">
  import { onDestroy } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon";
  import CopyIcon from "phosphor-svelte/lib/CopyIcon";
  import WarningCircleIcon from "phosphor-svelte/lib/WarningCircleIcon";
  import XIcon from "phosphor-svelte/lib/XIcon";
  import Banner from "../../components/banner/banner.svelte";
  import Button from "../../components/button/button.svelte";
  import Dialog from "../../components/dialog/dialog-content.svelte";
  import DialogRoot from "../../components/dialog/dialog-root.svelte";
  import DialogTitle from "../../components/dialog/dialog-title.svelte";
  import Input from "../../components/input/input.svelte";
  import { cn } from "../../utils/cn";
  import {
    KUMO_DELETE_RESOURCE_DEFAULT_VARIANTS,
    type KumoDeleteResourceVariantsProps,
  } from "./variants";

  export interface DeleteResourceProps
    extends KumoDeleteResourceVariantsProps {
    caseSensitive?: boolean;
    class?: string;
    deleteButtonText?: string;
    errorMessage?: string;
    isDeleting?: boolean;
    onDelete: () => void | Promise<void>;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
    resourceName: string;
    resourceType: string;
  }

  let {
    caseSensitive = true,
    class: className,
    deleteButtonText,
    errorMessage,
    isDeleting = false,
    onDelete,
    onOpenChange,
    open = $bindable(false),
    resourceName,
    resourceType,
    size = KUMO_DELETE_RESOURCE_DEFAULT_VARIANTS.size,
  }: DeleteResourceProps = $props();

  let confirmationInput = $state("");
  let copied = $state(false);
  let copyResetTimeout: ReturnType<typeof setTimeout> | undefined;

  let normalizedInput = $derived(normalizeForComparison(confirmationInput));
  let normalizedResourceName = $derived(normalizeForComparison(resourceName));
  let isConfirmed = $derived(normalizedInput === normalizedResourceName);

  onDestroy(() => {
    clearCopyReset();
  });

  function normalizeForComparison(value: string) {
    return caseSensitive ? value : value.toLowerCase();
  }

  function clearCopyReset() {
    if (!copyResetTimeout) return;

    clearTimeout(copyResetTimeout);
    copyResetTimeout = undefined;
  }

  function resetDraft() {
    confirmationInput = "";
    copied = false;
    clearCopyReset();
  }

  function handleOpenChange(nextOpen: boolean) {
    open = nextOpen;
    if (!nextOpen) resetDraft();
    onOpenChange?.(nextOpen);
  }

  async function handleDelete() {
    if (!isConfirmed || isDeleting) return;
    await onDelete();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(resourceName);
      copied = true;
      clearCopyReset();
      copyResetTimeout = setTimeout(() => {
        copied = false;
        copyResetTimeout = undefined;
      }, 1500);
    } catch (error) {
      console.warn("Failed to copy resource name", error);
    }
  }
</script>

{#snippet warningIcon()}
  <WarningCircleIcon aria-hidden="true" size={18} />
{/snippet}

<DialogRoot role="alertdialog" {open} onOpenChange={handleOpenChange}>
  <Dialog size={size} class={cn("p-0", className)}>
    <div class="flex items-center justify-between border-b border-kumo-line px-6 py-4">
      <DialogTitle class="text-lg font-semibold">
        Delete {resourceName}
      </DialogTitle>
      <Button
        variant="ghost"
        shape="square"
        size="sm"
        aria-label="Close"
        disabled={isDeleting}
        onclick={() => handleOpenChange(false)}
      >
        <XIcon aria-hidden="true" size={18} />
      </Button>
    </div>

    <div class="flex flex-col gap-4 p-6">
      <div class="flex flex-col gap-2">
        {#if errorMessage}
          <Banner icon={warningIcon} variant="error" text={errorMessage} />
        {/if}
        <p class="max-w-prose text-pretty text-base text-kumo-subtle">
          This action cannot be undone. This will permanently delete the
          <span class="font-medium text-kumo-default">{resourceName}</span>
          {resourceType.toLowerCase()}.
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-1.5 text-base">
          <span>
            Type
            <button
              class="group inline rounded-md bg-kumo-tint px-2 py-1 font-mono text-sm font-semibold hover:cursor-pointer hover:bg-kumo-fill"
              type="button"
              onclick={handleCopy}
              aria-label={`Copy ${resourceName} to clipboard`}
            >
              {resourceName}

              {#if copied}
                <CheckIcon
                  aria-hidden="true"
                  size={12}
                  weight="bold"
                  class="ml-1.5 inline"
                />
              {:else}
                <CopyIcon
                  aria-hidden="true"
                  size={12}
                  weight="bold"
                  class="ml-1.5 inline text-kumo-subtle group-hover:text-kumo-default"
                />
              {/if}
            </button>
            to confirm:
          </span>
        </div>
        <Input
          placeholder={resourceName}
          bind:value={confirmationInput}
          disabled={isDeleting}
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck={false}
          aria-label={`Type ${resourceName} to confirm deletion`}
          class="w-full"
        />
      </div>
    </div>

    <div class="flex justify-end gap-3 border-t border-kumo-line px-6 py-4">
      <Button
        variant="secondary"
        disabled={isDeleting}
        onclick={() => handleOpenChange(false)}
      >
        Cancel
      </Button>
      <Button
        variant="destructive"
        onclick={handleDelete}
        disabled={!isConfirmed || isDeleting}
        loading={isDeleting}
      >
        {deleteButtonText || `Delete ${resourceType}`}
      </Button>
    </div>
  </Dialog>
</DialogRoot>

