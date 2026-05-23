import { componentItems, type ComponentPageMetadata } from "$lib/component-docs";

export type { ComponentPageMetadata } from "$lib/component-docs";

export interface DocTocItem {
  depth: number;
  id: string;
  text: string;
}

export interface ComponentDocPage {
  bitsUiUrl?: string;
  description: string;
  editUrl?: string;
  href: string;
  sourceFile: string;
  title: string;
  toc: DocTocItem[];
}

const bitsUiDocsSlugs: Record<string, string> = {
  autocomplete: "combobox",
  button: "button",
  checkbox: "checkbox",
  collapsible: "collapsible",
  combobox: "combobox",
  "command-palette": "command",
  "date-picker": "date-picker",
  dialog: "dialog",
  dropdown: "dropdown-menu",
  label: "label",
  meter: "meter",
  popover: "popover",
  radio: "radio-group",
  select: "select",
  switch: "switch",
  tabs: "tabs",
  tooltip: "tooltip",
};

export function pageFromMetadata(
  slug: string,
  metadata: ComponentPageMetadata,
  toc: DocTocItem[] = [],
): ComponentDocPage {
  const sourceFile = metadata.sourceFile ?? `components/${slug}`;
  const bitsUiSlug = bitsUiDocsSlugs[slug];

  return {
    bitsUiUrl: bitsUiSlug ? bitsUiUrl(bitsUiSlug) : undefined,
    description: metadata.description,
    editUrl: `https://github.com/joshuadavidthomas/kumo-svelte/tree/main/packages/kumo-svelte/src/${sourceFile}`,
    href: `/components/${slug}`,
    sourceFile,
    title: metadata.title,
    toc,
  };
}

export function componentLabel(slug: string) {
  return (
    componentItems.find((component) => component.href === `/components/${slug}`)?.label ??
    titleize(slug)
  );
}

function bitsUiUrl(slug: string) {
  return `https://www.bits-ui.com/docs/components/${slug}`;
}

function titleize(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
