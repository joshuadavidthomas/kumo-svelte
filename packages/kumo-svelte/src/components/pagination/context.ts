import { getContext, setContext } from "svelte";

export interface PaginationLabels {
  navigation?: string;
  firstPage?: string;
  previousPage?: string;
  nextPage?: string;
  lastPage?: string;
  pageNumber?: string;
  pageSize?: string;
}

export const DEFAULT_PAGINATION_LABELS: Required<PaginationLabels> = {
  navigation: "Pagination",
  firstPage: "First page",
  previousPage: "Previous page",
  nextPage: "Next page",
  lastPage: "Last page",
  pageNumber: "Page number",
  pageSize: "Page size",
};

export interface PaginationContextValue {
  readonly editingPage: number;
  readonly labels: Required<PaginationLabels>;
  readonly maxPage: number;
  readonly page: number;
  readonly pageShowingRange: string;
  readonly perPage: number | undefined;
  readonly totalCount: number | undefined;
  setEditingPage(page: number): void;
  setPage(page: number): void;
}

const paginationContextKey = Symbol("kumo-pagination");

export function setPaginationContext(context: PaginationContextValue) {
  setContext(paginationContextKey, context);
}

export function getPaginationContext(componentName: string) {
  const context = getContext<PaginationContextValue | undefined>(paginationContextKey);

  if (!context) {
    throw new Error(`Pagination.${componentName} must be used within a Pagination component.`);
  }

  return context;
}
