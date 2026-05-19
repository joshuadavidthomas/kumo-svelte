import type { ComponentProps } from "svelte";
import MenuBarComponent from "./menubar.svelte";

export { default as MenuBar } from "./menubar.svelte";
export type MenuBarProps = ComponentProps<typeof MenuBarComponent>;
export {
  menuBarVariants,
  KUMO_MENUBAR_DEFAULT_VARIANTS,
  KUMO_MENUBAR_VARIANTS,
  type KumoMenuBarVariantsProps,
} from "./variants";
