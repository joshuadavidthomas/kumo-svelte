<script lang="ts">
  import CheckCircleIcon from "phosphor-svelte/lib/CheckCircleIcon";
  import CircleNotchIcon from "phosphor-svelte/lib/CircleNotchIcon";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
  import WarningOctagonIcon from "phosphor-svelte/lib/WarningOctagonIcon";
  import XIcon from "phosphor-svelte/lib/XIcon";
  import { onMount, type Snippet } from "svelte";
  import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
  import { cn } from "../../utils";
  import { KUMO_TOAST_VARIANTS, toastVariants } from "./variants";

  const TOASTY_ACTIVE_KEY = "__kumoSvelteToastyActiveId";
  const TOASTY_NEXT_KEY = "__kumoSvelteToastyNextId";

  function nextToasterId() {
    const state = globalThis as unknown as Record<string, number | undefined>;
    const current = (state[TOASTY_NEXT_KEY] ?? 0) + 1;
    state[TOASTY_NEXT_KEY] = current;
    return current;
  }

  function getActiveToasterId() {
    return (
      (globalThis as unknown as Record<string, number | null | undefined>)[
        TOASTY_ACTIVE_KEY
      ] ?? null
    );
  }

  function setActiveToasterId(id: number | null) {
    (globalThis as unknown as Record<string, number | null>)[TOASTY_ACTIVE_KEY] = id;
  }

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

  const toasterId = nextToasterId();
  let isActiveToaster = $state(false);

  let kumoToastOptions = $derived({
    ...toastOptions,
    unstyled: toastOptions?.unstyled ?? true,
    class: cn(toastVariants(), toastOptions?.class),
    descriptionClass: cn(
      KUMO_TOAST_VARIANTS.description.classes,
      toastOptions?.descriptionClass,
    ),
    classes: {
      toast: cn("relative flex min-h-16 w-[340px] items-start gap-2", toastOptions?.classes?.toast),
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

  onMount(() => {
    if (getActiveToasterId() === null) {
      setActiveToasterId(toasterId);
      isActiveToaster = true;
    }

    return () => {
      if (getActiveToasterId() === toasterId) {
        setActiveToasterId(null);
      }
    };
  });
</script>

{@render children?.()}
{#if isActiveToaster}
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
{/if}
