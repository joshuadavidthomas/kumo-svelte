import type { ComponentProps } from "svelte";
import ExternalIconComponent from "./external-icon.svelte";
import LinkComponent from "./link.svelte";

export { default as Link } from "./link.svelte";
export { default as ExternalIcon } from "./external-icon.svelte";
export type LinkProps = ComponentProps<typeof LinkComponent>;
export type ExternalIconProps = ComponentProps<typeof ExternalIconComponent>;
export {
  linkVariants,
  KUMO_LINK_DEFAULT_VARIANTS,
  KUMO_LINK_VARIANTS,
  type KumoLinkVariant,
  type KumoLinkVariantsProps,
} from "./variants";
