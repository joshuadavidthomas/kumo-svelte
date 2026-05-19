import type { ComponentProps } from "svelte";
import ClipboardTextComponent from "./clipboard-text.svelte";

export { default as ClipboardText } from "./clipboard-text.svelte";
export type ClipboardTextProps = ComponentProps<typeof ClipboardTextComponent>;
export {
  clipboardTextButtonSize,
  clipboardTextVariants,
  KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS,
  KUMO_CLIPBOARD_TEXT_VARIANTS,
  type ClipboardTextSize,
  type KumoClipboardTextSize,
  type KumoClipboardTextVariantsProps,
} from "./variants";
