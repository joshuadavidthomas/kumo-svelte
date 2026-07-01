import { componentItems, type DocsNavItem } from "$lib/component-docs";

export interface DocsNavGroup {
  items: DocsNavItem[];
  title: string;
}

export const staticPages: DocsNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Installation", href: "/installation" },
  { label: "Colors", href: "/colors" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Changelog", href: "/changelog" },
];

export const chartItems: DocsNavItem[] = [
  { label: "Charts", href: "/charts" },
  { label: "Colors", href: "/charts/colors" },
  { label: "Timeseries", href: "/charts/timeseries" },
  { label: "Maps", href: "/charts/maps" },
  { label: "Sankey", href: "/charts/sankey" },
  { label: "Custom Chart", href: "/charts/custom" },
];

export const blockItems: DocsNavItem[] = [
  { label: "Page Header", href: "/blocks/page-header" },
  { label: "Resource List", href: "/blocks/resource-list" },
  { label: "Delete Resource", href: "/blocks/delete-resource" },
];

export const docsNavigation: DocsNavGroup[] = [
  { title: "Get Started", items: staticPages },
  { title: "Charts", items: chartItems },
  { title: "Blocks", items: blockItems },
  { title: "Components", items: componentItems },
];
