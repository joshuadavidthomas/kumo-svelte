<script lang="ts">
  import CheckCircleIcon from "phosphor-svelte/lib/CheckCircleIcon.svelte";
  import CircleNotchIcon from "phosphor-svelte/lib/CircleNotchIcon.svelte";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon.svelte";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon.svelte";
  import WarningOctagonIcon from "phosphor-svelte/lib/WarningOctagonIcon.svelte";
  import XIcon from "phosphor-svelte/lib/XIcon.svelte";
  import type { Snippet } from "svelte";
  import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
  import { cn } from "../../utils";
  import { KUMO_TOAST_VARIANTS, toastVariants } from "./variants";

  export interface ToastyProps extends SonnerProps {
    children?: Snippet;
  }

  let {
    children,
    class: className,
    closeButton = true,
    expand = true,
    position = "bottom-right",
    toastOptions,
    visibleToasts = 3,
    ...restProps
  }: ToastyProps = $props();

  let kumoToastOptions = $derived({
    ...toastOptions,
    unstyled: toastOptions?.unstyled ?? true,
    class: cn(toastVariants(), toastOptions?.class),
    descriptionClass: cn(
      KUMO_TOAST_VARIANTS.description.classes,
      toastOptions?.descriptionClass,
    ),
    classes: {
      toast: cn("relative flex min-h-16 items-start gap-2", toastOptions?.classes?.toast),
      title: cn(KUMO_TOAST_VARIANTS.title.classes, toastOptions?.classes?.title),
      description: cn(
        KUMO_TOAST_VARIANTS.description.classes,
        toastOptions?.classes?.description,
      ),
      content: cn("flex min-w-0 flex-1 flex-col gap-1", toastOptions?.classes?.content),
      icon: cn("mt-0.5 shrink-0", toastOptions?.classes?.icon),
      closeButton: cn(KUMO_TOAST_VARIANTS.close.classes, toastOptions?.classes?.closeButton),
      actionButton: cn(
        "inline-flex items-center justify-center rounded-md bg-kumo-brand px-2 py-1 text-xs font-medium text-white",
        toastOptions?.classes?.actionButton,
      ),
      cancelButton: cn(
        "inline-flex items-center justify-center rounded-md bg-kumo-control px-2 py-1 text-xs font-medium text-kumo-default",
        toastOptions?.classes?.cancelButton,
      ),
      normal: cn(toastVariants(), toastOptions?.classes?.normal),
      default: cn(toastVariants(), toastOptions?.classes?.default),
      success: cn(toastVariants({ variant: "success" }), toastOptions?.classes?.success),
      error: cn(toastVariants({ variant: "error" }), toastOptions?.classes?.error),
      warning: cn(toastVariants({ variant: "warning" }), toastOptions?.classes?.warning),
      info: cn(toastVariants({ variant: "info" }), toastOptions?.classes?.info),
      loading: cn(toastVariants(), toastOptions?.classes?.loading),
    },
  });
</script>

{@render children?.()}
<Sonner
  class={cn("toaster group", className)}
  {closeButton}
  {expand}
  {position}
  toastOptions={kumoToastOptions}
  {visibleToasts}
  {...restProps}
>
  {#snippet loadingIcon()}
    <CircleNotchIcon class="size-4 animate-spin" />
  {/snippet}
  {#snippet successIcon()}
    <CheckCircleIcon class="size-4" weight="fill" />
  {/snippet}
  {#snippet errorIcon()}
    <WarningOctagonIcon class="size-4" weight="fill" />
  {/snippet}
  {#snippet infoIcon()}
    <InfoIcon class="size-4" weight="fill" />
  {/snippet}
  {#snippet warningIcon()}
    <WarningIcon class="size-4" weight="fill" />
  {/snippet}
  {#snippet closeIcon()}
    <XIcon class="size-3" />
  {/snippet}
</Sonner>
