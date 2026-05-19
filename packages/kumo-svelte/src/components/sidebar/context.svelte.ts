import { getContext, setContext } from "svelte";
import type { SidebarCollapsible, SidebarSide, SidebarVariant } from "./variants";

const SIDEBAR_CONTEXT = Symbol("kumo.sidebar");
const SIDEBAR_GROUP_CONTEXT = Symbol("kumo.sidebar.group");
const SIDEBAR_MENU_ITEM_CONTEXT = Symbol("kumo.sidebar.menu-item");
const SIDEBAR_MENU_SUB_ITEM_CONTEXT = Symbol("kumo.sidebar.menu-sub-item");

export interface SidebarContextValue {
  readonly collapsible: SidebarCollapsible;
  readonly isMobile: boolean;
  readonly isResizing: boolean;
  readonly maxWidth: number;
  readonly minWidth: number;
  readonly open: boolean;
  readonly openMobile: boolean;
  readonly resizable: boolean;
  readonly side: SidebarSide;
  readonly state: "collapsed" | "expanded";
  readonly variant: SidebarVariant;
  readonly width: number;
  setIsResizing: (resizing: boolean) => void;
  setOpen: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
  setWidth: (width: number) => void;
  toggleSidebar: () => void;
}

export interface SidebarGroupContextValue {
  readonly isCollapsible: boolean;
  readonly isOpen: boolean;
}

export function setSidebarContext(value: SidebarContextValue) {
  setContext(SIDEBAR_CONTEXT, value);
}

export function useSidebar(component = "Sidebar") {
  const context = getContext<SidebarContextValue | undefined>(SIDEBAR_CONTEXT);
  if (!context) {
    throw new Error(`${component} must be used within SidebarProvider.`);
  }
  return context;
}

export function setSidebarGroupContext(value: SidebarGroupContextValue) {
  setContext(SIDEBAR_GROUP_CONTEXT, value);
}

export function useSidebarGroup() {
  return (
    getContext<SidebarGroupContextValue | undefined>(SIDEBAR_GROUP_CONTEXT) ?? {
      isCollapsible: false,
      isOpen: true,
    }
  );
}

export function setSidebarMenuItemContext(value: boolean) {
  setContext(SIDEBAR_MENU_ITEM_CONTEXT, value);
}

export function isInsideSidebarMenuItem() {
  return getContext<boolean | undefined>(SIDEBAR_MENU_ITEM_CONTEXT) ?? false;
}

export function setSidebarMenuSubItemContext(value: boolean) {
  setContext(SIDEBAR_MENU_SUB_ITEM_CONTEXT, value);
}

export function isInsideSidebarMenuSubItem() {
  return getContext<boolean | undefined>(SIDEBAR_MENU_SUB_ITEM_CONTEXT) ?? false;
}
