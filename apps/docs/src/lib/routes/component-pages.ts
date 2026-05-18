import { componentItems, type ComponentPageMetadata } from "$lib/component-docs";

export type { ComponentPageMetadata } from "$lib/component-docs";

export interface DocTocItem {
  depth: number;
  id: string;
  text: string;
}

export interface ComponentDocPage {
  description: string;
  editUrl?: string;
  href: string;
  primitiveUrl?: string;
  sourceFile: string;
  title: string;
  toc: DocTocItem[];
}

const primitivePages = new Set([
  "autocomplete",
  "checkbox",
  "collapsible",
  "combobox",
  "date-picker",
  "dialog",
  "dropdown",
  "menu-bar",
  "popover",
  "radio",
  "select",
  "switch",
  "tabs",
  "tooltip",
]);

export function pageFromMetadata(slug: string, metadata: ComponentPageMetadata, toc: DocTocItem[] = []): ComponentDocPage {
  const sourceFile = metadata.sourceFile ?? `components/${slug}`;
  const primitive = metadata.primitive ?? (primitivePages.has(slug) ? slug : undefined);

  return {
    description: metadata.description,
    editUrl: `https://github.com/joshuadavidthomas/kumo-svelte/tree/main/src/${sourceFile}`,
    href: `/components/${slug}`,
    primitiveUrl: primitive ? primitiveUrl(primitive) : undefined,
    sourceFile,
    title: metadata.title,
    toc,
  };
}

export function componentLabel(slug: string) {
  return componentItems.find((component) => component.href === `/components/${slug}`)?.label ?? titleize(slug);
}

function primitiveUrl(primitive: string) {
  const bitsName = primitive
    .replace("dropdown", "dropdown-menu")
    .replace("radio", "radio-group")
    .replace("menu-bar", "menubar");

  return `https://www.bits-ui.com/docs/components/${bitsName}`;
}

function titleize(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
