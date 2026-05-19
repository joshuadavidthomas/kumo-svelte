import { toast as sonnerToast, useSonner, type ExternalToast, type ToastT } from "svelte-sonner";
import { cn } from "../../utils";
import {
  KUMO_TOAST_DEFAULT_VARIANTS,
  toastVariants,
  type KumoToastVariant,
  type KumoToastVariantsProps,
} from "./variants";

export interface KumoToastOptions extends Omit<ExternalToast, "class">, KumoToastVariantsProps {
  class?: string;
  title?: string;
}

export type KumoToastManagerAddOptions = KumoToastOptions;
export type KumoToastPromiseArgs = Parameters<typeof sonnerToast.promise>;

function toastOptions({ variant, title: _title, class: className, ...options }: KumoToastOptions) {
  return {
    ...options,
    class: cn(toastVariants({ variant }), className),
    unstyled: options.unstyled ?? true,
  };
}

export function notify(options: KumoToastOptions) {
  const variant = options.variant ?? KUMO_TOAST_DEFAULT_VARIANTS.variant;
  const title = options.title ?? "";
  const normalizedOptions = toastOptions(options);

  if (variant === "success") return sonnerToast.success(title, normalizedOptions);
  if (variant === "error") return sonnerToast.error(title, normalizedOptions);
  if (variant === "warning") return sonnerToast.warning(title, normalizedOptions);
  if (variant === "info") return sonnerToast.info(title, normalizedOptions);

  return sonnerToast(title, normalizedOptions);
}

export function createKumoToastManager() {
  return {
    add: notify,
    dismiss: sonnerToast.dismiss,
    get toasts() {
      return sonnerToast.getActiveToasts() as ToastT[];
    },
    promise: (...args: KumoToastPromiseArgs) => sonnerToast.promise(...args),
  };
}

export function useKumoToastManager() {
  const sonner = useSonner();

  return {
    ...createKumoToastManager(),
    get toasts() {
      return sonner.toasts as ToastT[];
    },
  };
}

export const toast = sonnerToast;
export const Toast = sonnerToast;
export { useSonner };
export type { ExternalToast, ToastT };
export type { KumoToastVariant };
