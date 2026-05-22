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

export {
  TableComponent as Table,
  TableComponent as TableRoot,
  TableComponent as Root,
  TableBodyComponent as TableBody,
  TableBodyComponent as Body,
  TableCellComponent as TableCell,
  TableCellComponent as Cell,
  TableCheckCellComponent as TableCheckCell,
  TableCheckCellComponent as CheckCell,
  TableCheckHeadComponent as TableCheckHead,
  TableCheckHeadComponent as CheckHead,
  TableFooterComponent as TableFooter,
  TableFooterComponent as Footer,
  TableHeadComponent as TableHead,
  TableHeadComponent as Head,
  TableHeaderComponent as TableHeader,
  TableHeaderComponent as Header,
  TableResizeHandleComponent as TableResizeHandle,
  TableResizeHandleComponent as ResizeHandle,
  TableRowComponent as TableRow,
  TableRowComponent as Row,
};

export type TableProps = ComponentProps<typeof TableComponent>;
export type TableRootProps = TableProps;
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
