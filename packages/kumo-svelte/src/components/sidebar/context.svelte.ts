import { getContext, setContext } from "svelte";
import type { SidebarCollapsible, SidebarSide, SidebarVariant } from "./variants";

const SIDEBAR_CONTEXT = Symbol("kumo.sidebar");
const SIDEBAR_GROUP_CONTEXT = Symbol("kumo.sidebar.group");
const SIDEBAR_MENU_ITEM_CONTEXT = Symbol("kumo.sidebar.menu-item");
const SIDEBAR_MENU_SUB_ITEM_CONTEXT = Symbol("kumo.sidebar.menu-sub-item");
const SIDEBAR_COLLAPSIBLE_CONTEXT = Symbol("kumo.sidebar.collapsible");
const SIDEBAR_SLIDING_VIEWS_CONTEXT = Symbol("kumo.sidebar.sliding-views");

export type SidebarState = "collapsed" | "expanded" | "peeking";

export interface SidebarContextValue {
  readonly animationDuration: number;
  readonly collapsible: SidebarCollapsible;
  readonly contained: boolean;
  readonly isMobile: boolean;
  readonly isPeeking: boolean;
  readonly isResizing: boolean;
  readonly maxWidth: number;
  readonly minWidth: number;
  readonly open: boolean;
  readonly openMobile: boolean;
  readonly peekable: boolean;
  readonly resizable: boolean;
  readonly side: SidebarSide;
  readonly state: SidebarState;
  readonly variant: SidebarVariant;
  readonly width: number;
  setIsResizing: (resizing: boolean) => void;
  setOpen: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
  setWidth: (width: number) => void;
  startPeek: () => void;
  stopPeek: () => void;
  toggleSidebar: () => void;
}

export interface SidebarGroupContextValue {
  readonly isCollapsible: boolean;
  readonly isOpen: boolean;
}

export interface SidebarCollapsibleContextValue {
  readonly autoScrollOnOpen: boolean;
  readonly open: boolean;
}

export interface SidebarSlidingViewsContextValue {
  readonly activeKey: string;
  isActive: (value: string) => boolean;
  register: () => symbol;
  unregister: (id: symbol) => void;
  update: (id: symbol, value: string) => void;
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

export function setSidebarCollapsibleContext(value: SidebarCollapsibleContextValue) {
  setContext(SIDEBAR_COLLAPSIBLE_CONTEXT, value);
}

export function useSidebarCollapsible() {
  return (
    getContext<SidebarCollapsibleContextValue | undefined>(SIDEBAR_COLLAPSIBLE_CONTEXT) ?? {
      autoScrollOnOpen: false,
      open: true,
    }
  );
}

export function setSidebarSlidingViewsContext(value: SidebarSlidingViewsContextValue) {
  setContext(SIDEBAR_SLIDING_VIEWS_CONTEXT, value);
}

export function useSidebarSlidingViews(component = "SidebarSlidingView") {
  const context = getContext<SidebarSlidingViewsContextValue | undefined>(
    SIDEBAR_SLIDING_VIEWS_CONTEXT,
  );
  if (!context) {
    throw new Error(`${component} must be used within SidebarSlidingViews.`);
  }
  return context;
}
