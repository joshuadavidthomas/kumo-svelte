import type { ComponentProps } from "svelte";
import ExternalIconComponent from "./external-icon.svelte";
import LinkComponent from "./link.svelte";

export {
  LinkComponent as Link,
  LinkComponent as LinkRoot,
  LinkComponent as Root,
  ExternalIconComponent as ExternalIcon,
};
export type LinkProps = ComponentProps<typeof LinkComponent>;
export type LinkRootProps = LinkProps;
export type ExternalIconProps = ComponentProps<typeof ExternalIconComponent>;
export {
  linkVariants,
  KUMO_LINK_DEFAULT_VARIANTS,
  KUMO_LINK_VARIANTS,
  type KumoLinkVariant,
  type KumoLinkVariantsProps,
} from "./variants";
