<script lang="ts">
  import AutocompleteHomeDemo from "./components/autocomplete/autocomplete-home-demo.svelte";
  import BadgeHomeDemo from "./components/badge/badge-home-demo.svelte";
  import BannerHomeDemo from "./components/banner/banner-home-demo.svelte";
  import BreadcrumbsHomeDemo from "./components/breadcrumbs/breadcrumbs-home-demo.svelte";
  import ButtonHomeDemo from "./components/button/button-home-demo.svelte";
  import CheckboxHomeDemo from "./components/checkbox/checkbox-home-demo.svelte";
  import ClipboardTextHomeDemo from "./components/clipboard-text/clipboard-text-home-demo.svelte";
  import CodeHighlightedHomeDemo from "./components/code-highlighted/code-highlighted-home-demo.svelte";
  import CollapsibleHomeDemo from "./components/collapsible/collapsible-home-demo.svelte";
  import ComboboxHomeDemo from "./components/combobox/combobox-home-demo.svelte";
  import CommandPaletteHomeDemo from "./components/command-palette/command-palette-home-demo.svelte";
  import DatePickerHomeDemo from "./components/date-picker/date-picker-home-demo.svelte";
  import DialogHomeDemo from "./components/dialog/dialog-home-demo.svelte";
  import DropdownHomeDemo from "./components/dropdown/dropdown-home-demo.svelte";
  import EmptyHomeDemo from "./components/empty/empty-home-demo.svelte";
  import FlowHomeDemo from "./components/flow/flow-home-demo.svelte";
  import GridHomeDemo from "./components/grid/grid-home-demo.svelte";
  import InputAreaHomeDemo from "./components/input-area/input-area-home-demo.svelte";
  import InputGroupHomeDemo from "./components/input-group/input-group-home-demo.svelte";
  import InputHomeDemo from "./components/input/input-home-demo.svelte";
  import InputValidationHomeDemo from "./components/input/input-validation-home-demo.svelte";
  import LabelHomeDemo from "./components/label/label-home-demo.svelte";
  import LayerCardHomeDemo from "./components/layer-card/layer-card-home-demo.svelte";
  import LinkHomeDemo from "./components/link/link-home-demo.svelte";
  import LoaderHomeDemo from "./components/loader/loader-home-demo.svelte";
  import MenuBarHomeDemo from "./components/menu-bar/menu-bar-home-demo.svelte";
  import MeterHomeDemo from "./components/meter/meter-home-demo.svelte";
  import PaginationHomeDemo from "./components/pagination/pagination-home-demo.svelte";
  import PopoverHomeDemo from "./components/popover/popover-home-demo.svelte";
  import RadioHomeDemo from "./components/radio/radio-home-demo.svelte";
  import SelectHomeDemo from "./components/select/select-home-demo.svelte";
  import SensitiveInputHomeDemo from "./components/sensitive-input/sensitive-input-home-demo.svelte";
  import SkeletonLineHomeDemo from "./components/skeleton-line/skeleton-line-home-demo.svelte";
  import SwitchHomeDemo from "./components/switch/switch-home-demo.svelte";
  import TableOfContentsHomeDemo from "./components/table-of-contents/table-of-contents-home-demo.svelte";
  import TableHomeDemo from "./components/table/table-home-demo.svelte";
  import TabsHomeDemo from "./components/tabs/tabs-home-demo.svelte";
  import TextHomeDemo from "./components/text/text-home-demo.svelte";
  import ToastHomeDemo from "./components/toast/toast-home-demo.svelte";
  import TooltipHomeDemo from "./components/tooltip/tooltip-home-demo.svelte";

  const componentRoutes: Record<string, string> = {
    autocomplete: "/components/autocomplete",
    badge: "/components/badge",
    banner: "/components/banner",
    breadcrumbs: "/components/breadcrumbs",
    button: "/components/button",
    checkbox: "/components/checkbox",
    "clipboard-text": "/components/clipboard-text",
    "code-highlighted": "/components/code-highlighted",
    collapsible: "/components/collapsible",
    combobox: "/components/combobox",
    "command-palette": "/components/command-palette",
    "date-picker": "/components/date-picker",
    dialog: "/components/dialog",
    dropdown: "/components/dropdown",
    empty: "/components/empty",
    flow: "/components/flow",
    grid: "/components/grid",
    input: "/components/input",
    "input-area": "/components/input-area",
    "input-group": "/components/input-group",
    label: "/components/label",
    "layer-card": "/components/layer-card",
    link: "/components/link",
    loader: "/components/loader",
    "menu-bar": "/components/menu-bar",
    meter: "/components/meter",
    pagination: "/components/pagination",
    popover: "/components/popover",
    radio: "/components/radio",
    select: "/components/select",
    "sensitive-input": "/components/sensitive-input",
    "skeleton-line": "/components/skeleton-line",
    switch: "/components/switch",
    table: "/components/table",
    "table-of-contents": "/components/table-of-contents",
    tabs: "/components/tabs",
    text: "/components/text",
    toast: "/components/toast",
    tooltip: "/components/tooltip",
  };

  const components = [
    { name: "Button", id: "button", Component: ButtonHomeDemo },
    { name: "Input", id: "input", Component: InputHomeDemo },
    { name: "Select", id: "select", Component: SelectHomeDemo },
    { name: "Autocomplete", id: "autocomplete", Component: AutocompleteHomeDemo },
    { name: "Combobox", id: "combobox", Component: ComboboxHomeDemo },
    { name: "Switch", id: "switch", Component: SwitchHomeDemo },
    { name: "Input (with validation)", id: "input", Component: InputValidationHomeDemo },
    { name: "Dialog", id: "dialog", Component: DialogHomeDemo },
    { name: "Tooltip", id: "tooltip", Component: TooltipHomeDemo },
    { name: "Dropdown", id: "dropdown", Component: DropdownHomeDemo },
    { name: "Collapsible", id: "collapsible", Component: CollapsibleHomeDemo },
    { name: "Checkbox", id: "checkbox", Component: CheckboxHomeDemo },
    { name: "LayerCard", id: "layer-card", Component: LayerCardHomeDemo },
    { name: "Loader", id: "loader", Component: LoaderHomeDemo },
    { name: "SkeletonLine", id: "skeleton-line", Component: SkeletonLineHomeDemo },
    { name: "CodeHighlighted", id: "code-highlighted", Component: CodeHighlightedHomeDemo },
    { name: "Banner", id: "banner", Component: BannerHomeDemo },
    { name: "Tabs", id: "tabs", Component: TabsHomeDemo },
    { name: "Badge", id: "badge", Component: BadgeHomeDemo },
    { name: "Toast", id: "toast", Component: ToastHomeDemo },
    { name: "Pagination", id: "pagination", Component: PaginationHomeDemo },
    { name: "InputArea", id: "input-area", Component: InputAreaHomeDemo },
    { name: "InputGroup", id: "input-group", Component: InputGroupHomeDemo },
    { name: "Meter", id: "meter", Component: MeterHomeDemo },
    { name: "MenuBar", id: "menu-bar", Component: MenuBarHomeDemo },
    { name: "DatePicker", id: "date-picker", Component: DatePickerHomeDemo },
    { name: "Breadcrumbs", id: "breadcrumbs", Component: BreadcrumbsHomeDemo },
    { name: "ClipboardText", id: "clipboard-text", Component: ClipboardTextHomeDemo },
    { name: "CommandPalette", id: "command-palette", Component: CommandPaletteHomeDemo },
    { name: "Flow", id: "flow", Component: FlowHomeDemo },
    { name: "Link", id: "link", Component: LinkHomeDemo },
    { name: "Empty", id: "empty", Component: EmptyHomeDemo },
    { name: "Grid", id: "grid", Component: GridHomeDemo },
    { name: "Label", id: "label", Component: LabelHomeDemo },
    { name: "Popover", id: "popover", Component: PopoverHomeDemo },
    { name: "Radio", id: "radio", Component: RadioHomeDemo },
    { name: "SensitiveInput", id: "sensitive-input", Component: SensitiveInputHomeDemo },
    { name: "Table", id: "table", Component: TableHomeDemo },
    { name: "TableOfContents", id: "table-of-contents", Component: TableOfContentsHomeDemo },
    { name: "Text", id: "text", Component: TextHomeDemo },
  ];
</script>

<svelte:head>
  <title>Kumo Svelte</title>
  <meta name="description" content="A SvelteKit documentation site for the Kumo Svelte component library." />
</svelte:head>

<ul class="grid auto-rows-min grid-cols-1 gap-px bg-kumo-hairline md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
  {#each components as component (component.name)}
    {@const route = componentRoutes[component.id]}
    {@const Preview = component.Component}
    <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
      {#if route}
        <a href={route} class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">
          {component.name}
        </a>
      {:else}
        <span class="absolute top-4 left-4 text-base font-medium text-kumo-subtle italic">{component.name}</span>
      {/if}
      <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
        <Preview />
      </div>
    </li>
  {/each}
</ul>
