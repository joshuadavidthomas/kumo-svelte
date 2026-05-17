import type { ComponentProps } from "svelte";
import DialogCloseComponent from "./dialog-close.svelte";
import DialogContentComponent from "./dialog-content.svelte";
import DialogDescriptionComponent from "./dialog-description.svelte";
import DialogRootComponent from "./dialog-root.svelte";
import DialogTitleComponent from "./dialog-title.svelte";
import DialogTriggerComponent from "./dialog-trigger.svelte";

export { default as Dialog } from "./dialog-content.svelte";
export { default as DialogRoot } from "./dialog-root.svelte";
export { default as DialogTrigger } from "./dialog-trigger.svelte";
export { default as DialogTitle } from "./dialog-title.svelte";
export { default as DialogDescription } from "./dialog-description.svelte";
export { default as DialogClose } from "./dialog-close.svelte";

export type DialogProps = ComponentProps<typeof DialogContentComponent>;
export type DialogRootProps = ComponentProps<typeof DialogRootComponent>;
export type DialogTriggerProps = ComponentProps<typeof DialogTriggerComponent>;
export type DialogTitleProps = ComponentProps<typeof DialogTitleComponent>;
export type DialogDescriptionProps = ComponentProps<typeof DialogDescriptionComponent>;
export type DialogCloseProps = ComponentProps<typeof DialogCloseComponent>;

export {
  dialogVariants,
  KUMO_DIALOG_DEFAULT_VARIANTS,
  KUMO_DIALOG_STYLING,
  KUMO_DIALOG_VARIANTS,
  type KumoDialogRole,
  type KumoDialogSize,
  type KumoDialogVariantsProps,
} from "./variants";
