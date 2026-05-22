import type { ComponentProps } from "svelte";
import PopoverCloseComponent from "./popover-close.svelte";
import PopoverContentComponent from "./popover-content.svelte";
import PopoverDescriptionComponent from "./popover-description.svelte";
import PopoverHeaderComponent from "./popover-header.svelte";
import PopoverPortalComponent from "./popover-portal.svelte";
import PopoverRootComponent from "./popover-root.svelte";
import PopoverTitleComponent from "./popover-title.svelte";
import PopoverTriggerComponent from "./popover-trigger.svelte";

export {
  PopoverRootComponent as Popover,
  PopoverRootComponent as PopoverRoot,
  PopoverRootComponent as Root,
  PopoverPortalComponent as PopoverPortal,
  PopoverPortalComponent as Portal,
  PopoverTriggerComponent as PopoverTrigger,
  PopoverTriggerComponent as Trigger,
  PopoverContentComponent as PopoverContent,
  PopoverContentComponent as Content,
  PopoverHeaderComponent as PopoverHeader,
  PopoverHeaderComponent as Header,
  PopoverTitleComponent as PopoverTitle,
  PopoverTitleComponent as Title,
  PopoverDescriptionComponent as PopoverDescription,
  PopoverDescriptionComponent as Description,
  PopoverCloseComponent as PopoverClose,
  PopoverCloseComponent as Close,
};

export type PopoverRootProps = ComponentProps<typeof PopoverRootComponent>;
export type PopoverPortalProps = ComponentProps<typeof PopoverPortalComponent>;
export type PopoverTriggerProps = ComponentProps<typeof PopoverTriggerComponent>;
export type PopoverContentProps = ComponentProps<typeof PopoverContentComponent>;
export type PopoverHeaderProps = ComponentProps<typeof PopoverHeaderComponent>;
export type PopoverTitleProps = ComponentProps<typeof PopoverTitleComponent>;
export type PopoverDescriptionProps = ComponentProps<typeof PopoverDescriptionComponent>;
export type PopoverCloseProps = ComponentProps<typeof PopoverCloseComponent>;

export {
  popoverVariants,
  KUMO_POPOVER_DEFAULT_VARIANTS,
  KUMO_POPOVER_VARIANTS,
  type KumoPopoverAlign,
  type KumoPopoverSide,
  type KumoPopoverVariantsProps,
} from "./variants";
