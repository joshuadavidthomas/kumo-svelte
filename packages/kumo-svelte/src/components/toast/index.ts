import type { ComponentProps } from "svelte";
import ToastyComponent from "./toasty.svelte";

export { default as Toaster } from "./toasty.svelte";
export { default as ToastProvider } from "./toasty.svelte";
export { default as Toasty } from "./toasty.svelte";
export type ToastyProps = ComponentProps<typeof ToastyComponent>;
export type ToastProviderProps = ToastyProps;
export type ToasterProps = ToastyProps;
export {
  createKumoToastManager,
  notify,
  Toast,
  toast,
  useKumoToastManager,
  useSonner,
  type ExternalToast,
  type KumoToastManagerAddOptions,
  type KumoToastOptions,
  type KumoToastPromiseArgs,
  type ToastT,
} from "./toast";
export {
  KUMO_TOAST_DEFAULT_VARIANTS,
  KUMO_TOAST_STYLING,
  KUMO_TOAST_VARIANTS,
  toastVariants,
  type KumoToastVariant,
  type KumoToastVariantsProps,
} from "./variants";
