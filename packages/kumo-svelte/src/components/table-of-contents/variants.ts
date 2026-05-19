import { cn } from "../../utils/cn";

export const KUMO_TABLE_OF_CONTENTS_VARIANTS = {
  state: {
    default: {
      classes: "text-kumo-subtle hover:border-kumo-line hover:text-kumo-default hover:font-medium",
      description: "Inactive section link",
    },
    active: {
      classes: "border-kumo-brand font-medium text-kumo-default",
      description: "Currently visible / active section",
    },
  },
} as const;

export const KUMO_TABLE_OF_CONTENTS_DEFAULT_VARIANTS = {
  state: "default",
} as const;

export type KumoTableOfContentsState = keyof typeof KUMO_TABLE_OF_CONTENTS_VARIANTS.state;

export const TABLE_OF_CONTENTS_ITEM_BASE =
  "block w-full truncate border-l-2 border-transparent py-0.5 pl-4 text-left text-sm no-underline";

export const TABLE_OF_CONTENTS_NESTED_LIST_CLASSES =
  "flex flex-col gap-2 border-l-2 border-kumo-hairline [&>li>a]:pl-7 [&>li>button]:pl-7";

export function tableOfContentsItemVariants(active = false) {
  return cn(
    TABLE_OF_CONTENTS_ITEM_BASE,
    active
      ? KUMO_TABLE_OF_CONTENTS_VARIANTS.state.active.classes
      : KUMO_TABLE_OF_CONTENTS_VARIANTS.state.default.classes,
  );
}
