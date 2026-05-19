import type { ComponentProps } from "svelte";
import BreadcrumbsComponent from "./breadcrumbs.svelte";
import BreadcrumbsClipboardComponent from "./breadcrumbs-clipboard.svelte";
import BreadcrumbsCurrentComponent from "./breadcrumbs-current.svelte";
import BreadcrumbsEllipsisComponent from "./breadcrumbs-ellipsis.svelte";
import BreadcrumbsLinkComponent from "./breadcrumbs-link.svelte";
import BreadcrumbsSeparatorComponent from "./breadcrumbs-separator.svelte";

export { default as Breadcrumbs } from "./breadcrumbs.svelte";
export { default as BreadcrumbsRoot } from "./breadcrumbs.svelte";
export { default as BreadcrumbsClipboard } from "./breadcrumbs-clipboard.svelte";
export { default as BreadcrumbsCurrent } from "./breadcrumbs-current.svelte";
export { default as BreadcrumbsEllipsis } from "./breadcrumbs-ellipsis.svelte";
export { default as BreadcrumbsLink } from "./breadcrumbs-link.svelte";
export { default as BreadcrumbsSeparator } from "./breadcrumbs-separator.svelte";

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
