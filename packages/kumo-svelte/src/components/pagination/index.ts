import type { ComponentProps } from "svelte";
import PaginationComponent from "./pagination.svelte";
import PaginationControlsComponent from "./pagination-controls.svelte";
import PaginationInfoComponent from "./pagination-info.svelte";
import PaginationPageSizeComponent from "./pagination-page-size.svelte";
import PaginationSeparatorComponent from "./pagination-separator.svelte";

const Pagination = Object.assign(PaginationComponent, {
  Root: PaginationComponent,
  Controls: PaginationControlsComponent,
  Info: PaginationInfoComponent,
  PageSize: PaginationPageSizeComponent,
  Separator: PaginationSeparatorComponent,
});

export {
  Pagination,
  PaginationComponent as PaginationRoot,
  PaginationComponent as Root,
  PaginationControlsComponent as PaginationControls,
  PaginationControlsComponent as Controls,
  PaginationInfoComponent as PaginationInfo,
  PaginationInfoComponent as Info,
  PaginationPageSizeComponent as PaginationPageSize,
  PaginationPageSizeComponent as PageSize,
  PaginationSeparatorComponent as PaginationSeparator,
  PaginationSeparatorComponent as Separator,
};

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
