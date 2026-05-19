import type { ComponentProps } from "svelte";
import TableOfContentsComponent from "./table-of-contents.svelte";
import TableOfContentsGroupComponent from "./table-of-contents-group.svelte";
import TableOfContentsItemComponent from "./table-of-contents-item.svelte";
import TableOfContentsListComponent from "./table-of-contents-list.svelte";
import TableOfContentsTitleComponent from "./table-of-contents-title.svelte";

export { default as TableOfContents } from "./table-of-contents.svelte";
export { default as TableOfContentsRoot } from "./table-of-contents.svelte";
export { default as TableOfContentsGroup } from "./table-of-contents-group.svelte";
export { default as TableOfContentsItem } from "./table-of-contents-item.svelte";
export { default as TableOfContentsList } from "./table-of-contents-list.svelte";
export { default as TableOfContentsTitle } from "./table-of-contents-title.svelte";

export type TableOfContentsProps = ComponentProps<typeof TableOfContentsComponent>;
export type TableOfContentsRootProps = TableOfContentsProps;
export type TableOfContentsGroupProps = ComponentProps<typeof TableOfContentsGroupComponent>;
export type TableOfContentsItemProps = ComponentProps<typeof TableOfContentsItemComponent>;
export type TableOfContentsListProps = ComponentProps<typeof TableOfContentsListComponent>;
export type TableOfContentsTitleProps = ComponentProps<typeof TableOfContentsTitleComponent>;

export {
  KUMO_TABLE_OF_CONTENTS_DEFAULT_VARIANTS,
  KUMO_TABLE_OF_CONTENTS_VARIANTS,
  TABLE_OF_CONTENTS_ITEM_BASE,
  TABLE_OF_CONTENTS_NESTED_LIST_CLASSES,
  tableOfContentsItemVariants,
  type KumoTableOfContentsState,
} from "./variants";
