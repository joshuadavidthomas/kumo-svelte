import type { ComponentProps } from "svelte";
import PopoverCloseComponent from "./popover-close.svelte";
import PopoverContentComponent from "./popover-content.svelte";
import PopoverDescriptionComponent from "./popover-description.svelte";
import PopoverHeaderComponent from "./popover-header.svelte";
import PopoverPortalComponent from "./popover-portal.svelte";
import PopoverRootComponent from "./popover-root.svelte";
import PopoverTitleComponent from "./popover-title.svelte";
import PopoverTriggerComponent from "./popover-trigger.svelte";

export { default as Popover } from "./popover-root.svelte";
export { default as PopoverRoot } from "./popover-root.svelte";
export { default as PopoverPortal } from "./popover-portal.svelte";
export { default as PopoverTrigger } from "./popover-trigger.svelte";
export { default as PopoverContent } from "./popover-content.svelte";
export { default as PopoverHeader } from "./popover-header.svelte";
export { default as PopoverTitle } from "./popover-title.svelte";
export { default as PopoverDescription } from "./popover-description.svelte";
export { default as PopoverClose } from "./popover-close.svelte";

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
