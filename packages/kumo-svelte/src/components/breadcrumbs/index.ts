import type { ComponentProps } from "svelte";
import BreadcrumbsComponent from "./breadcrumbs.svelte";
import BreadcrumbsClipboardComponent from "./breadcrumbs-clipboard.svelte";
import BreadcrumbsCurrentComponent from "./breadcrumbs-current.svelte";
import BreadcrumbsEllipsisComponent from "./breadcrumbs-ellipsis.svelte";
import BreadcrumbsLinkComponent from "./breadcrumbs-link.svelte";
import BreadcrumbsSeparatorComponent from "./breadcrumbs-separator.svelte";

const Breadcrumbs = Object.assign(BreadcrumbsComponent, {
  Root: BreadcrumbsComponent,
  Clipboard: BreadcrumbsClipboardComponent,
  Current: BreadcrumbsCurrentComponent,
  Ellipsis: BreadcrumbsEllipsisComponent,
  Link: BreadcrumbsLinkComponent,
  Separator: BreadcrumbsSeparatorComponent,
});
const Breadcrumb = Breadcrumbs;

export {
  Breadcrumb,
  Breadcrumbs,
  BreadcrumbsComponent as BreadcrumbsRoot,
  BreadcrumbsComponent as Root,
  BreadcrumbsClipboardComponent as BreadcrumbsClipboard,
  BreadcrumbsClipboardComponent as Clipboard,
  BreadcrumbsCurrentComponent as BreadcrumbsCurrent,
  BreadcrumbsCurrentComponent as Current,
  BreadcrumbsEllipsisComponent as BreadcrumbsEllipsis,
  BreadcrumbsEllipsisComponent as Ellipsis,
  BreadcrumbsLinkComponent as BreadcrumbsLink,
  BreadcrumbsLinkComponent as Link,
  BreadcrumbsSeparatorComponent as BreadcrumbsSeparator,
  BreadcrumbsSeparatorComponent as Separator,
};

export type BreadcrumbsProps = ComponentProps<typeof BreadcrumbsComponent>;
export type BreadcrumbsRootProps = BreadcrumbsProps;
export type BreadcrumbsClipboardProps = ComponentProps<typeof BreadcrumbsClipboardComponent>;
export type BreadcrumbsCurrentProps = ComponentProps<typeof BreadcrumbsCurrentComponent>;
export type BreadcrumbsEllipsisProps = ComponentProps<typeof BreadcrumbsEllipsisComponent>;
export type BreadcrumbsLinkProps = ComponentProps<typeof BreadcrumbsLinkComponent>;
export type BreadcrumbsSeparatorProps = ComponentProps<typeof BreadcrumbsSeparatorComponent>;

export {
  breadcrumbsVariants,
  KUMO_BREADCRUMBS_DEFAULT_VARIANTS,
  KUMO_BREADCRUMBS_VARIANTS,
  type KumoBreadcrumbsSize,
  type KumoBreadcrumbsVariantsProps,
} from "./variants";
