<script lang="ts">
  import { componentItems } from "$lib/component-docs";
  import AutocompleteDemo from "./components/autocomplete/autocomplete-demo.svelte";
  import BadgeDemo from "./components/badge/badge-semantic-variants-demo.svelte";
  import BannerDemo from "./components/banner/banner-default-demo.svelte";
  import BreadcrumbsDemo from "./components/breadcrumbs/breadcrumbs-demo.svelte";
  import ButtonDemo from "./components/button/button-home-demo.svelte";
  import CheckboxDemo from "./components/checkbox/checkbox-basic-demo.svelte";
  import ClipboardTextDemo from "./components/clipboard-text/clipboard-text-basic-demo.svelte";
  import CloudflareLogoDemo from "./components/cloudflare-logo/cloudflare-logo-basic-demo.svelte";
  import CodeHighlightedDemo from "./components/code-highlighted/code-highlighted-basic-demo.svelte";
  import CollapsibleDemo from "./components/collapsible/collapsible-basic-demo.svelte";
  import ComboboxDemo from "./components/combobox/combobox-demo.svelte";
  import CommandPaletteDemo from "./components/command-palette/command-palette-simple-demo.svelte";
  import DatePickerDemo from "./components/date-picker/date-picker-single-demo.svelte";
  import DialogDemo from "./components/dialog/dialog-basic-demo.svelte";
  import DropdownDemo from "./components/dropdown/dropdown-basic-demo.svelte";
  import EmptyDemo from "./components/empty/empty-basic-demo.svelte";
  import GridDemo from "./components/grid/grid-demo.svelte";
  import InputDemo from "./components/input/input-basic-demo.svelte";
  import InputAreaDemo from "./components/input-area/input-area-basic-demo.svelte";
  import InputGroupDemo from "./components/input-group/input-group-demo.svelte";
  import LabelDemo from "./components/label/label-basic-demo.svelte";
  import LayerCardDemo from "./components/layer-card/layer-card-basic-demo.svelte";
  import LinkDemo from "./components/link/link-basic-demo.svelte";
  import LoaderDemo from "./components/loader/loader-basic-demo.svelte";
  import MenuBarDemo from "./components/menu-bar/menu-bar-basic-demo.svelte";
  import MeterDemo from "./components/meter/meter-basic-demo.svelte";
  import PaginationDemo from "./components/pagination/pagination-simple-demo.svelte";
  import PopoverDemo from "./components/popover/popover-basic-demo.svelte";
  import RadioDemo from "./components/radio/radio-basic-demo.svelte";
  import SelectDemo from "./components/select/select-basic-demo.svelte";
  import SensitiveInputDemo from "./components/sensitive-input/sensitive-input-demo.svelte";
  import SidebarDemo from "./components/sidebar/sidebar-basic-demo.svelte";
  import SkeletonLineDemo from "./components/skeleton-line/skeleton-line-demo.svelte";
  import SwitchDemo from "./components/switch/switch-basic-demo.svelte";
  import TableDemo from "./components/table/table-basic-demo.svelte";
  import TableOfContentsDemo from "./components/table-of-contents/table-of-contents-basic-demo.svelte";
  import TabsDemo from "./components/tabs/tabs-segmented-demo.svelte";
  import TextDemo from "./components/text/text-variants-demo.svelte";
  import ToastDemo from "./components/toast/toast-basic-demo.svelte";
  import TooltipDemo from "./components/tooltip/tooltip-basic-demo.svelte";

  const previews = {
    autocomplete: AutocompleteDemo,
    badge: BadgeDemo,
    banner: BannerDemo,
    breadcrumbs: BreadcrumbsDemo,
    button: ButtonDemo,
    checkbox: CheckboxDemo,
    "clipboard-text": ClipboardTextDemo,
    "cloudflare-logo": CloudflareLogoDemo,
    "code-highlighted": CodeHighlightedDemo,
    collapsible: CollapsibleDemo,
    combobox: ComboboxDemo,
    "command-palette": CommandPaletteDemo,
    "date-picker": DatePickerDemo,
    dialog: DialogDemo,
    dropdown: DropdownDemo,
    empty: EmptyDemo,
    grid: GridDemo,
    input: InputDemo,
    "input-area": InputAreaDemo,
    "input-group": InputGroupDemo,
    label: LabelDemo,
    "layer-card": LayerCardDemo,
    link: LinkDemo,
    loader: LoaderDemo,
    "menu-bar": MenuBarDemo,
    meter: MeterDemo,
    pagination: PaginationDemo,
    popover: PopoverDemo,
    radio: RadioDemo,
    select: SelectDemo,
    "sensitive-input": SensitiveInputDemo,
    sidebar: SidebarDemo,
    "skeleton-line": SkeletonLineDemo,
    switch: SwitchDemo,
    table: TableDemo,
    "table-of-contents": TableOfContentsDemo,
    tabs: TabsDemo,
    text: TextDemo,
    toast: ToastDemo,
    tooltip: TooltipDemo,
  };
</script>

<svelte:head>
  <title>Kumo Svelte</title>
  <meta name="description" content="A SvelteKit documentation site for the Kumo Svelte component library." />
</svelte:head>

<ul class="grid auto-rows-min grid-cols-1 gap-px bg-[var(--kumo-line)] md:grid-cols-2 xl:grid-cols-3">
  {#each componentItems as item (item.href)}
    {@const Preview = previews[item.slug as keyof typeof previews]}
    <li data-home-card class="relative grid aspect-square overflow-hidden bg-[var(--kumo-black)] p-4">
      <a class="absolute top-4 left-4 z-10 text-sm font-semibold text-[var(--kumo-text)] no-underline" href={item.href}>
        {item.label}
      </a>

      <div class="flex min-w-0 items-center justify-center p-8">
        {#if Preview}
          <div data-home-preview class="max-h-full w-full max-w-80 overflow-hidden">
            <Preview />
          </div>
        {:else}
          <p class="max-w-56 text-center text-sm leading-6 text-[var(--kumo-muted)]">{item.description}</p>
        {/if}
      </div>
    </li>
  {/each}
</ul>
