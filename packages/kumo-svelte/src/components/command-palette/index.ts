import type { ComponentProps } from "svelte";
import CommandPaletteComponent from "./command-palette.svelte";
import CommandPaletteDialogComponent from "./command-palette-dialog.svelte";
import CommandPaletteEmptyComponent from "./command-palette-empty.svelte";
import CommandPaletteFooterComponent from "./command-palette-footer.svelte";
import CommandPaletteGroupComponent from "./command-palette-group.svelte";
import CommandPaletteGroupLabelComponent from "./command-palette-group-label.svelte";
import CommandPaletteInputComponent from "./command-palette-input.svelte";
import CommandPaletteItemComponent from "./command-palette-item.svelte";
import CommandPaletteListComponent from "./command-palette-list.svelte";
import CommandPaletteLoadingComponent from "./command-palette-loading.svelte";
import CommandPaletteResultItemComponent from "./command-palette-result-item.svelte";
import CommandPaletteSeparatorComponent from "./command-palette-separator.svelte";
import HighlightedTextComponent from "./highlighted-text.svelte";

export { default as CommandPalette } from "./command-palette.svelte";
export { default as CommandPaletteRoot } from "./command-palette.svelte";
export { default as CommandPaletteDialog } from "./command-palette-dialog.svelte";
export { default as CommandPaletteEmpty } from "./command-palette-empty.svelte";
export { default as CommandPaletteFooter } from "./command-palette-footer.svelte";
export { default as CommandPaletteGroup } from "./command-palette-group.svelte";
export { default as CommandPaletteGroupLabel } from "./command-palette-group-label.svelte";
export { default as CommandPaletteInput } from "./command-palette-input.svelte";
export { default as CommandPaletteItem } from "./command-palette-item.svelte";
export { default as CommandPaletteList } from "./command-palette-list.svelte";
export { default as CommandPaletteLoading } from "./command-palette-loading.svelte";
export { default as CommandPaletteResultItem } from "./command-palette-result-item.svelte";
export { default as CommandPaletteSeparator } from "./command-palette-separator.svelte";
export { default as HighlightedText } from "./highlighted-text.svelte";

export type CommandPaletteProps = ComponentProps<typeof CommandPaletteComponent>;
export type CommandPaletteRootProps = CommandPaletteProps;
export type CommandPaletteDialogProps = ComponentProps<typeof CommandPaletteDialogComponent>;
export type CommandPaletteEmptyProps = ComponentProps<typeof CommandPaletteEmptyComponent>;
export type CommandPaletteFooterProps = ComponentProps<typeof CommandPaletteFooterComponent>;
export type CommandPaletteGroupProps = ComponentProps<typeof CommandPaletteGroupComponent>;
export type CommandPaletteGroupLabelProps = ComponentProps<
  typeof CommandPaletteGroupLabelComponent
>;
export type CommandPaletteInputProps = ComponentProps<typeof CommandPaletteInputComponent>;
export type CommandPaletteItemProps = ComponentProps<typeof CommandPaletteItemComponent>;
export type CommandPaletteListProps = ComponentProps<typeof CommandPaletteListComponent>;
export type CommandPaletteLoadingProps = ComponentProps<typeof CommandPaletteLoadingComponent>;
export type CommandPaletteResultItemProps = ComponentProps<
  typeof CommandPaletteResultItemComponent
>;
export type CommandPaletteSeparatorProps = ComponentProps<typeof CommandPaletteSeparatorComponent>;
export type HighlightedTextProps = ComponentProps<typeof HighlightedTextComponent>;

export {
  KUMO_COMMAND_PALETTE_DEFAULT_VARIANTS,
  KUMO_COMMAND_PALETTE_VARIANTS,
  type HighlightRange,
} from "./variants";
