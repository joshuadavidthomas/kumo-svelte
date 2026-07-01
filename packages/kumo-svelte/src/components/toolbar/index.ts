import type { ComponentProps } from "svelte";
import ToolbarComponent from "./toolbar.svelte";
import ToolbarButtonComponent from "./toolbar-button.svelte";
import ToolbarInputComponent from "./toolbar-input.svelte";
import ToolbarInputGroupComponent from "./toolbar-input-group.svelte";

export {
  ToolbarComponent as Toolbar,
  ToolbarComponent as Root,
  ToolbarButtonComponent as ToolbarButton,
  ToolbarButtonComponent as Button,
  ToolbarInputComponent as ToolbarInput,
  ToolbarInputComponent as Input,
  ToolbarInputGroupComponent as ToolbarInputGroup,
  ToolbarInputGroupComponent as InputGroup,
};

export type ToolbarProps = ComponentProps<typeof ToolbarComponent>;
export type ToolbarButtonProps = ComponentProps<typeof ToolbarButtonComponent>;
export type ToolbarInputProps = ComponentProps<typeof ToolbarInputComponent>;
export type ToolbarInputGroupProps = ComponentProps<typeof ToolbarInputGroupComponent>;

export {
  KUMO_TOOLBAR_DEFAULT_VARIANTS,
  KUMO_TOOLBAR_VARIANTS,
  toolbarControlClassName,
  toolbarVariants,
  type KumoToolbarVariantsProps,
  type ToolbarSize,
} from "./variants";
