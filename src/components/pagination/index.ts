import type { ComponentProps } from "svelte";
import PaginationComponent from "./pagination.svelte";
import PaginationControlsComponent from "./pagination-controls.svelte";
import PaginationInfoComponent from "./pagination-info.svelte";
import PaginationPageSizeComponent from "./pagination-page-size.svelte";
import PaginationSeparatorComponent from "./pagination-separator.svelte";

export { default as Pagination } from "./pagination.svelte";
export { default as PaginationRoot } from "./pagination.svelte";
export { default as PaginationInfo } from "./pagination-info.svelte";
export { default as PaginationPageSize } from "./pagination-page-size.svelte";
export { default as PaginationControls } from "./pagination-controls.svelte";
export { default as PaginationSeparator } from "./pagination-separator.svelte";

export type PaginationProps = ComponentProps<typeof PaginationComponent>;
export type PaginationRootProps = PaginationProps;
export type PaginationControlsProps = ComponentProps<typeof PaginationControlsComponent>;
export type PaginationInfoProps = ComponentProps<typeof PaginationInfoComponent>;
export type PaginationPageSizeProps = ComponentProps<typeof PaginationPageSizeComponent>;
export type PaginationSeparatorProps = ComponentProps<typeof PaginationSeparatorComponent>;

export {
  DEFAULT_PAGINATION_LABELS,
  type PaginationContextValue,
  type PaginationLabels,
} from "./context";
export {
  KUMO_PAGINATION_DEFAULT_VARIANTS,
  KUMO_PAGINATION_VARIANTS,
  paginationVariants,
  type KumoPaginationControls,
  type KumoPaginationVariantsProps,
} from "./variants";
