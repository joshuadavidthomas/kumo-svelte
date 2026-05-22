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

export {
  CommandPaletteComponent as CommandPalette,
  CommandPaletteComponent as CommandPaletteRoot,
  CommandPaletteComponent as CommandPalettePanel,
  CommandPaletteComponent as Root,
  CommandPaletteComponent as Panel,
  CommandPaletteDialogComponent as CommandPaletteDialog,
  CommandPaletteDialogComponent as Dialog,
  CommandPaletteEmptyComponent as CommandPaletteEmpty,
  CommandPaletteEmptyComponent as Empty,
  CommandPaletteFooterComponent as CommandPaletteFooter,
  CommandPaletteFooterComponent as Footer,
  CommandPaletteGroupComponent as CommandPaletteGroup,
  CommandPaletteGroupComponent as Group,
  CommandPaletteGroupLabelComponent as CommandPaletteGroupLabel,
  CommandPaletteGroupLabelComponent as GroupLabel,
  CommandPaletteInputComponent as CommandPaletteInput,
  CommandPaletteInputComponent as Input,
  CommandPaletteItemComponent as CommandPaletteItem,
  CommandPaletteItemComponent as Item,
  CommandPaletteListComponent as CommandPaletteList,
  CommandPaletteListComponent as List,
  CommandPaletteLoadingComponent as CommandPaletteLoading,
  CommandPaletteLoadingComponent as Loading,
  CommandPaletteResultItemComponent as CommandPaletteResultItem,
  CommandPaletteResultItemComponent as ResultItem,
  CommandPaletteSeparatorComponent as CommandPaletteSeparator,
  CommandPaletteSeparatorComponent as Separator,
  HighlightedTextComponent as HighlightedText,
};

export type CommandPaletteProps = ComponentProps<typeof CommandPaletteComponent>;
export type CommandPaletteRootProps = CommandPaletteProps;
export type CommandPalettePanelProps = CommandPaletteProps;
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
