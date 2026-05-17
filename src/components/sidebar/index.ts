import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import SidebarComponent from "./sidebar.svelte";
import SidebarCollapsibleContentComponent from "./sidebar-collapsible-content.svelte";
import SidebarContentComponent from "./sidebar-content.svelte";
import SidebarFooterComponent from "./sidebar-footer.svelte";
import SidebarGroupComponent from "./sidebar-group.svelte";
import SidebarGroupContentComponent from "./sidebar-group-content.svelte";
import SidebarGroupLabelComponent from "./sidebar-group-label.svelte";
import SidebarHeaderComponent from "./sidebar-header.svelte";
import SidebarInputComponent from "./sidebar-input.svelte";
import SidebarMenuComponent from "./sidebar-menu.svelte";
import SidebarMenuActionComponent from "./sidebar-menu-action.svelte";
import SidebarMenuBadgeComponent from "./sidebar-menu-badge.svelte";
import SidebarMenuButtonComponent from "./sidebar-menu-button.svelte";
import SidebarMenuChevronComponent from "./sidebar-menu-chevron.svelte";
import SidebarMenuItemComponent from "./sidebar-menu-item.svelte";
import SidebarMenuSubComponent from "./sidebar-menu-sub.svelte";
import SidebarMenuSubButtonComponent from "./sidebar-menu-sub-button.svelte";
import SidebarMenuSubItemComponent from "./sidebar-menu-sub-item.svelte";
import SidebarProviderComponent from "./sidebar-provider.svelte";
import SidebarRailComponent from "./sidebar-rail.svelte";
import SidebarResizeHandleComponent from "./sidebar-resize-handle.svelte";
import SidebarSeparatorComponent from "./sidebar-separator.svelte";
import SidebarTriggerComponent from "./sidebar-trigger.svelte";

export { default as Sidebar } from "./sidebar.svelte";
export { default as SidebarContent } from "./sidebar-content.svelte";
export { default as SidebarFooter } from "./sidebar-footer.svelte";
export { default as SidebarGroup } from "./sidebar-group.svelte";
export { default as SidebarGroupContent } from "./sidebar-group-content.svelte";
export { default as SidebarGroupLabel } from "./sidebar-group-label.svelte";
export { default as SidebarHeader } from "./sidebar-header.svelte";
export { default as SidebarInput } from "./sidebar-input.svelte";
export { default as SidebarMenu } from "./sidebar-menu.svelte";
export { default as SidebarMenuAction } from "./sidebar-menu-action.svelte";
export { default as SidebarMenuBadge } from "./sidebar-menu-badge.svelte";
export { default as SidebarMenuButton } from "./sidebar-menu-button.svelte";
export { default as SidebarMenuChevron } from "./sidebar-menu-chevron.svelte";
export { default as SidebarMenuItem } from "./sidebar-menu-item.svelte";
export { default as SidebarMenuSub } from "./sidebar-menu-sub.svelte";
export { default as SidebarMenuSubButton } from "./sidebar-menu-sub-button.svelte";
export { default as SidebarMenuSubItem } from "./sidebar-menu-sub-item.svelte";
export { default as SidebarProvider } from "./sidebar-provider.svelte";
export { default as SidebarRail } from "./sidebar-rail.svelte";
export { default as SidebarResizeHandle } from "./sidebar-resize-handle.svelte";
export { default as SidebarSeparator } from "./sidebar-separator.svelte";
export { default as SidebarTrigger } from "./sidebar-trigger.svelte";

export const SidebarCollapsible = CollapsiblePrimitive.Root;
export const SidebarCollapsibleTrigger = CollapsiblePrimitive.Trigger;
export { default as SidebarCollapsibleContent } from "./sidebar-collapsible-content.svelte";

export type SidebarProps = ComponentProps<typeof SidebarComponent>;
export type SidebarCollapsibleContentProps = ComponentProps<
  typeof SidebarCollapsibleContentComponent
>;
export type SidebarContentProps = ComponentProps<typeof SidebarContentComponent>;
export type SidebarFooterProps = ComponentProps<typeof SidebarFooterComponent>;
export type SidebarGroupProps = ComponentProps<typeof SidebarGroupComponent>;
export type SidebarGroupContentProps = ComponentProps<typeof SidebarGroupContentComponent>;
export type SidebarGroupLabelProps = ComponentProps<typeof SidebarGroupLabelComponent>;
export type SidebarHeaderProps = ComponentProps<typeof SidebarHeaderComponent>;
export type SidebarInputProps = ComponentProps<typeof SidebarInputComponent>;
export type SidebarMenuProps = ComponentProps<typeof SidebarMenuComponent>;
export type SidebarMenuActionProps = ComponentProps<typeof SidebarMenuActionComponent>;
export type SidebarMenuBadgeProps = ComponentProps<typeof SidebarMenuBadgeComponent>;
export type SidebarMenuButtonProps = ComponentProps<typeof SidebarMenuButtonComponent>;
export type SidebarMenuChevronProps = ComponentProps<typeof SidebarMenuChevronComponent>;
export type SidebarMenuItemProps = ComponentProps<typeof SidebarMenuItemComponent>;
export type SidebarMenuSubProps = ComponentProps<typeof SidebarMenuSubComponent>;
export type SidebarMenuSubButtonProps = ComponentProps<typeof SidebarMenuSubButtonComponent>;
export type SidebarMenuSubItemProps = ComponentProps<typeof SidebarMenuSubItemComponent>;
export type SidebarProviderProps = ComponentProps<typeof SidebarProviderComponent>;
export type SidebarRailProps = ComponentProps<typeof SidebarRailComponent>;
export type SidebarResizeHandleProps = ComponentProps<typeof SidebarResizeHandleComponent>;
export type SidebarSeparatorProps = ComponentProps<typeof SidebarSeparatorComponent>;
export type SidebarTriggerProps = ComponentProps<typeof SidebarTriggerComponent>;

export { useSidebar } from "./context.svelte";
export {
  KUMO_SIDEBAR_DEFAULT_VARIANTS,
  KUMO_SIDEBAR_STYLING,
  KUMO_SIDEBAR_VARIANTS,
  sidebarVariants,
  type KumoSidebarVariantsProps,
  type SidebarCollapsible as SidebarCollapsibleMode,
  type SidebarSide,
  type SidebarVariant,
} from "./variants";
