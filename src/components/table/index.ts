import type { ComponentProps } from "svelte";
import TableBodyComponent from "./table-body.svelte";
import TableCellComponent from "./table-cell.svelte";
import TableCheckCellComponent from "./table-check-cell.svelte";
import TableCheckHeadComponent from "./table-check-head.svelte";
import TableFooterComponent from "./table-footer.svelte";
import TableHeadComponent from "./table-head.svelte";
import TableHeaderComponent from "./table-header.svelte";
import TableResizeHandleComponent from "./table-resize-handle.svelte";
import TableRowComponent from "./table-row.svelte";
import TableComponent from "./table.svelte";

export { default as Table } from "./table.svelte";
export { default as TableBody } from "./table-body.svelte";
export { default as TableCell } from "./table-cell.svelte";
export { default as TableCheckCell } from "./table-check-cell.svelte";
export { default as TableCheckHead } from "./table-check-head.svelte";
export { default as TableFooter } from "./table-footer.svelte";
export { default as TableHead } from "./table-head.svelte";
export { default as TableHeader } from "./table-header.svelte";
export { default as TableResizeHandle } from "./table-resize-handle.svelte";
export { default as TableRow } from "./table-row.svelte";

export type TableProps = ComponentProps<typeof TableComponent>;
export type TableBodyProps = ComponentProps<typeof TableBodyComponent>;
export type TableCellProps = ComponentProps<typeof TableCellComponent>;
export type TableCheckCellProps = ComponentProps<typeof TableCheckCellComponent>;
export type TableCheckHeadProps = ComponentProps<typeof TableCheckHeadComponent>;
export type TableFooterProps = ComponentProps<typeof TableFooterComponent>;
export type TableHeadProps = ComponentProps<typeof TableHeadComponent>;
export type TableHeaderProps = ComponentProps<typeof TableHeaderComponent>;
export type TableResizeHandleProps = ComponentProps<typeof TableResizeHandleComponent>;
export type TableRowProps = ComponentProps<typeof TableRowComponent>;

export {
  stickyColumnClasses,
  tableRowVariants,
  tableVariants,
  KUMO_TABLE_DEFAULT_VARIANTS,
  KUMO_TABLE_VARIANTS,
  type KumoTableLayout,
  type KumoTableRowVariant,
  type KumoTableRowVariantsProps,
  type KumoTableStickyColumn,
  type KumoTableVariantsProps,
} from "./variants";
