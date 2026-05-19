import { cn } from "../../utils/cn";

export const KUMO_MENUBAR_VARIANTS = {} as const;
export const KUMO_MENUBAR_DEFAULT_VARIANTS = {} as const;

export interface KumoMenuBarVariantsProps {}

export function menuBarVariants(_props: KumoMenuBarVariantsProps = {}) {
  return cn(
    "isolate flex rounded-lg bg-kumo-recessed pl-px shadow-xs ring ring-kumo-line transition-colors",
  );
}
