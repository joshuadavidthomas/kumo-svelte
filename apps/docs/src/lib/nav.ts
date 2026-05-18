export interface DocsNavItem {
  href: string;
  label: string;
}

export interface DocsNavGroup {
  items: DocsNavItem[];
  title: string;
}

export const staticPages: DocsNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Installation", href: "/installation" },
  { label: "Contributing", href: "/contributing" },
  { label: "Colors", href: "/colors" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Figma Resources", href: "/figma" },
  { label: "CLI", href: "/cli" },
  { label: "Registry", href: "/registry" },
  { label: "Changelog", href: "/changelog" },
];

export const componentItems: DocsNavItem[] = [
  { label: "Autocomplete", href: "/components/autocomplete" },
  { label: "Badge", href: "/components/badge" },
  { label: "Banner", href: "/components/banner" },
  { label: "Breadcrumbs", href: "/components/breadcrumbs" },
  { label: "Button", href: "/components/button" },
  { label: "Checkbox", href: "/components/checkbox" },
  { label: "Clipboard Text", href: "/components/clipboard-text" },
  { label: "Cloudflare Logo", href: "/components/cloudflare-logo" },
  { label: "CodeHighlighted", href: "/components/code-highlighted" },
  { label: "Collapsible", href: "/components/collapsible" },
  { label: "Combobox", href: "/components/combobox" },
  { label: "Command Palette", href: "/components/command-palette" },
  { label: "Date Picker", href: "/components/date-picker" },
  { label: "Dialog", href: "/components/dialog" },
  { label: "Dropdown", href: "/components/dropdown" },
  { label: "Empty", href: "/components/empty" },
  { label: "Flow", href: "/components/flow" },
  { label: "Grid", href: "/components/grid" },
  { label: "Input", href: "/components/input" },
  { label: "InputArea", href: "/components/input-area" },
  { label: "InputGroup", href: "/components/input-group" },
  { label: "Label", href: "/components/label" },
  { label: "Layer Card", href: "/components/layer-card" },
  { label: "Link", href: "/components/link" },
  { label: "Loader", href: "/components/loader" },
  { label: "MenuBar", href: "/components/menu-bar" },
  { label: "Meter", href: "/components/meter" },
  { label: "Pagination", href: "/components/pagination" },
  { label: "Popover", href: "/components/popover" },
  { label: "Radio", href: "/components/radio" },
  { label: "Select", href: "/components/select" },
  { label: "Sensitive Input", href: "/components/sensitive-input" },
  { label: "Sidebar", href: "/components/sidebar" },
  { label: "Skeleton Line", href: "/components/skeleton-line" },
  { label: "Switch", href: "/components/switch" },
  { label: "Table", href: "/components/table" },
  { label: "Table of Contents", href: "/components/table-of-contents" },
  { label: "Tabs", href: "/components/tabs" },
  { label: "Text", href: "/components/text" },
  { label: "Toast", href: "/components/toast" },
  { label: "Tooltip", href: "/components/tooltip" },
];

export const chartItems: DocsNavItem[] = [
  { label: "Charts", href: "/charts" },
  { label: "Colors", href: "/charts/colors" },
  { label: "Timeseries", href: "/charts/timeseries" },
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
  { title: "Components", items: componentItems },
  { title: "Charts", items: chartItems },
  { title: "Blocks", items: blockItems },
];
