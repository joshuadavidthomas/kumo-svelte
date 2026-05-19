import type { ComponentProps } from "svelte";
import TextComponent from "./text.svelte";

export { default as Text } from "./text.svelte";
export type TextProps = ComponentProps<typeof TextComponent>;
export {
  textVariants,
  KUMO_TEXT_DEFAULT_VARIANTS,
  KUMO_TEXT_STYLING,
  KUMO_TEXT_VARIANTS,
  type KumoTextSize,
  type KumoTextVariant,
  type KumoTextVariantsProps,
  type TextElement,
} from "./variants";
