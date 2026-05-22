import type { ComponentProps } from "svelte";
import ExternalIconComponent from "./external-icon.svelte";
import LinkComponent from "./link.svelte";

const Link = Object.assign(LinkComponent, {
  Root: LinkComponent,
  ExternalIcon: ExternalIconComponent,
});

export {
  Link,
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
