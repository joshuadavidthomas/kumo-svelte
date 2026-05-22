import type { ComponentProps } from "svelte";
import DialogCloseComponent from "./dialog-close.svelte";
import DialogContentComponent from "./dialog-content.svelte";
import DialogDescriptionComponent from "./dialog-description.svelte";
import DialogFooterComponent from "./dialog-footer.svelte";
import DialogHeaderComponent from "./dialog-header.svelte";
import DialogOverlayComponent from "./dialog-overlay.svelte";
import DialogPortalComponent from "./dialog-portal.svelte";
import DialogRootComponent from "./dialog-root.svelte";
import DialogTitleComponent from "./dialog-title.svelte";
import DialogTriggerComponent from "./dialog-trigger.svelte";

const Dialog = Object.assign(DialogContentComponent, {
  Root: DialogRootComponent,
  Portal: DialogPortalComponent,
  Overlay: DialogOverlayComponent,
  Content: DialogContentComponent,
  Header: DialogHeaderComponent,
  Footer: DialogFooterComponent,
  Trigger: DialogTriggerComponent,
  Title: DialogTitleComponent,
  Description: DialogDescriptionComponent,
  Close: DialogCloseComponent,
});

export {
  Dialog,
  DialogRootComponent as DialogRoot,
  DialogRootComponent as Root,
  DialogPortalComponent as DialogPortal,
  DialogPortalComponent as Portal,
  DialogOverlayComponent as DialogOverlay,
  DialogOverlayComponent as Overlay,
  DialogContentComponent as DialogContent,
  DialogContentComponent as Content,
  DialogHeaderComponent as DialogHeader,
  DialogHeaderComponent as Header,
  DialogFooterComponent as DialogFooter,
  DialogFooterComponent as Footer,
  DialogTriggerComponent as DialogTrigger,
  DialogTriggerComponent as Trigger,
  DialogTitleComponent as DialogTitle,
  DialogTitleComponent as Title,
  DialogDescriptionComponent as DialogDescription,
  DialogDescriptionComponent as Description,
  DialogCloseComponent as DialogClose,
  DialogCloseComponent as Close,
};

export type DialogProps = ComponentProps<typeof DialogContentComponent>;
export type DialogRootProps = ComponentProps<typeof DialogRootComponent>;
export type DialogPortalProps = ComponentProps<typeof DialogPortalComponent>;
export type DialogOverlayProps = ComponentProps<typeof DialogOverlayComponent>;
export type DialogContentProps = DialogProps;
export type DialogHeaderProps = ComponentProps<typeof DialogHeaderComponent>;
export type DialogFooterProps = ComponentProps<typeof DialogFooterComponent>;
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
