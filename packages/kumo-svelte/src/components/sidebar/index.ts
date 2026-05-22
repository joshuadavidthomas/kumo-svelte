import type { ComponentProps } from "svelte";
import SidebarComponent from "./sidebar.svelte";
import SidebarCollapsibleComponent from "./sidebar-collapsible.svelte";
import SidebarCollapsibleContentComponent from "./sidebar-collapsible-content.svelte";
import SidebarCollapsibleTriggerComponent from "./sidebar-collapsible-trigger.svelte";
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

const Sidebar = Object.assign(SidebarComponent, {
  Root: SidebarComponent,
  Provider: SidebarProviderComponent,
  Header: SidebarHeaderComponent,
  Content: SidebarContentComponent,
  Footer: SidebarFooterComponent,
  Group: SidebarGroupComponent,
  GroupLabel: SidebarGroupLabelComponent,
  GroupContent: SidebarGroupContentComponent,
  Menu: SidebarMenuComponent,
  MenuItem: SidebarMenuItemComponent,
  MenuButton: SidebarMenuButtonComponent,
  MenuAction: SidebarMenuActionComponent,
  MenuBadge: SidebarMenuBadgeComponent,
  MenuChevron: SidebarMenuChevronComponent,
  MenuSub: SidebarMenuSubComponent,
  MenuSubItem: SidebarMenuSubItemComponent,
  MenuSubButton: SidebarMenuSubButtonComponent,
  Separator: SidebarSeparatorComponent,
  Input: SidebarInputComponent,
  Trigger: SidebarTriggerComponent,
  Rail: SidebarRailComponent,
  ResizeHandle: SidebarResizeHandleComponent,
  Collapsible: SidebarCollapsibleComponent,
  CollapsibleTrigger: SidebarCollapsibleTriggerComponent,
  CollapsibleContent: SidebarCollapsibleContentComponent,
});

export {
  Sidebar,
  SidebarComponent as SidebarRoot,
  SidebarComponent as Root,
  SidebarContentComponent as SidebarContent,
  SidebarContentComponent as Content,
  SidebarFooterComponent as SidebarFooter,
  SidebarFooterComponent as Footer,
  SidebarGroupComponent as SidebarGroup,
  SidebarGroupComponent as Group,
  SidebarGroupContentComponent as SidebarGroupContent,
  SidebarGroupContentComponent as GroupContent,
  SidebarGroupLabelComponent as SidebarGroupLabel,
  SidebarGroupLabelComponent as GroupLabel,
  SidebarHeaderComponent as SidebarHeader,
  SidebarHeaderComponent as Header,
  SidebarInputComponent as SidebarInput,
  SidebarInputComponent as Input,
  SidebarMenuComponent as SidebarMenu,
  SidebarMenuComponent as Menu,
  SidebarMenuActionComponent as SidebarMenuAction,
  SidebarMenuActionComponent as MenuAction,
  SidebarMenuBadgeComponent as SidebarMenuBadge,
  SidebarMenuBadgeComponent as MenuBadge,
  SidebarMenuButtonComponent as SidebarMenuButton,
  SidebarMenuButtonComponent as MenuButton,
  SidebarMenuChevronComponent as SidebarMenuChevron,
  SidebarMenuChevronComponent as MenuChevron,
  SidebarMenuItemComponent as SidebarMenuItem,
  SidebarMenuItemComponent as MenuItem,
  SidebarMenuSubComponent as SidebarMenuSub,
  SidebarMenuSubComponent as MenuSub,
  SidebarMenuSubButtonComponent as SidebarMenuSubButton,
  SidebarMenuSubButtonComponent as MenuSubButton,
  SidebarMenuSubItemComponent as SidebarMenuSubItem,
  SidebarMenuSubItemComponent as MenuSubItem,
  SidebarProviderComponent as SidebarProvider,
  SidebarProviderComponent as Provider,
  SidebarRailComponent as SidebarRail,
  SidebarRailComponent as Rail,
  SidebarResizeHandleComponent as SidebarResizeHandle,
  SidebarResizeHandleComponent as ResizeHandle,
  SidebarSeparatorComponent as SidebarSeparator,
  SidebarSeparatorComponent as Separator,
  SidebarTriggerComponent as SidebarTrigger,
  SidebarTriggerComponent as Trigger,
  SidebarCollapsibleComponent as SidebarCollapsible,
  SidebarCollapsibleComponent as Collapsible,
  SidebarCollapsibleContentComponent as SidebarCollapsibleContent,
  SidebarCollapsibleContentComponent as CollapsibleContent,
  SidebarCollapsibleTriggerComponent as SidebarCollapsibleTrigger,
  SidebarCollapsibleTriggerComponent as CollapsibleTrigger,
};

export type SidebarProps = ComponentProps<typeof SidebarComponent>;
export type SidebarRootProps = SidebarProps;
export type SidebarCollapsibleProps = ComponentProps<typeof SidebarCollapsibleComponent>;
export type SidebarCollapsibleContentProps = ComponentProps<
  typeof SidebarCollapsibleContentComponent
>;
export type SidebarCollapsibleTriggerProps = ComponentProps<
  typeof SidebarCollapsibleTriggerComponent
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
