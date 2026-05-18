<script lang="ts">
  import {
    Autocomplete,
    AutocompleteInputGroup,
    Badge,
    Banner,
    Breadcrumbs,
    BreadcrumbsCurrent,
    BreadcrumbsLink,
    BreadcrumbsSeparator,
    Button,
    Checkbox,
    ClipboardText,
    CloudflareLogo,
    CodeBlock,
    CollapsibleDefaultPanel,
    CollapsibleDefaultTrigger,
    CollapsibleRoot,
    Combobox,
    ComboboxTriggerInput,
    CommandPalette,
    CommandPaletteGroup,
    CommandPaletteGroupLabel,
    CommandPaletteInput,
    CommandPaletteItem,
    CommandPaletteList,
    DatePicker,
    DialogContent,
    DialogDescription,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    Empty,
    Flow,
    FlowNode,
    Grid,
    GridItem,
    Input,
    InputArea,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupSuffix,
    Label,
    LayerCard,
    LayerCardPrimary,
    LayerCardSecondary,
    Link,
    Loader,
    MenuBar,
    Meter,
    Pagination,
    PopoverContent,
    PopoverDescription,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
    RadioGroup,
    RadioItem,
    Select,
    SensitiveInput,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SkeletonLine,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableOfContents,
    TableOfContentsItem,
    TableOfContentsList,
    TableOfContentsTitle,
    TableRow,
    Tabs,
    Text,
    Toasty,
    Tooltip,
    TooltipProvider,
  } from "kumo-svelte";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import TextBolderIcon from "phosphor-svelte/lib/TextBIcon";
  import TextItalicIcon from "phosphor-svelte/lib/TextItalicIcon";
  import TranslateIcon from "phosphor-svelte/lib/TranslateIcon";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
  import WarningOctagonIcon from "phosphor-svelte/lib/WarningOctagonIcon";
  import { componentItems } from "./nav";

  const fruitItems = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ];
  const issueItems = [
    { label: "bug", value: "bug" },
    { label: "documentation", value: "documentation" },
    { label: "enhancement", value: "enhancement" },
  ];
  const versionItems = {
    active: "Active versions",
    all: "All deployed versions",
    specific: "Specific versions",
  };
  const tabItems = [
    { label: "Preview", value: "preview" },
    { label: "Code", value: "code" },
    { label: "Props", value: "props" },
  ];

  let switchToggled = $state(true);
  let checked = $state(true);
  let autocompleteOpen = $state(false);
  let comboboxOpen = $state(false);
  let menuBarActive = $state<number | undefined>(0);
  let paginationPage = $state(1);

  function setPaginationPage(page: number) {
    paginationPage = page;
  }

  function tileClass(label: string) {
    return label === "Date Picker" ? "demo-component compact-calendar" : "demo-component";
  }
</script>

{#snippet plusIcon()}
  <PlusIcon aria-hidden="true" size={14} weight="bold" />
{/snippet}

{#snippet warningIcon()}
  <WarningIcon aria-hidden="true" size={16} weight="fill" />
{/snippet}

{#snippet errorIcon()}
  <WarningOctagonIcon aria-hidden="true" size={16} weight="fill" />
{/snippet}

{#snippet boldIcon()}
  <TextBolderIcon aria-hidden="true" size={18} weight="bold" />
{/snippet}

{#snippet italicIcon()}
  <TextItalicIcon aria-hidden="true" size={18} />
{/snippet}

{#snippet translateIcon()}
  <TranslateIcon aria-hidden="true" size={16} />
{/snippet}

{#snippet labelTooltip()}
  More info
{/snippet}

<TooltipProvider>
  <section id="components" class="component-board" aria-label="Component previews">
    {#each componentItems as item (item.href)}
      <article class="demo-tile">
      <a class="demo-title" href={item.href}>{item.label}</a>
      <div class={tileClass(item.label)}>
        {#if item.label === "Autocomplete"}
          <Autocomplete items={fruitItems} bind:open={autocompleteOpen}>
            <AutocompleteInputGroup placeholder="Search fruits..." />
          </Autocomplete>
        {:else if item.label === "Badge"}
          <div class="stack tight">
            <Badge variant="blue">Blue</Badge>
            <Badge variant="green">Green</Badge>
            <Badge variant="orange">Orange</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
        {:else if item.label === "Banner"}
          <div class="stack">
            <Banner text="This is a default banner." />
            <Banner icon={warningIcon} text="This is an alert banner." variant="alert" />
            <Banner icon={errorIcon} text="This is an error banner." variant="error" />
          </div>
        {:else if item.label === "Breadcrumbs"}
          <Breadcrumbs>
            <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
            <BreadcrumbsSeparator />
            <BreadcrumbsLink href="/components/button">Docs</BreadcrumbsLink>
            <BreadcrumbsSeparator />
            <BreadcrumbsCurrent>Page</BreadcrumbsCurrent>
          </Breadcrumbs>
        {:else if item.label === "Button"}
          <div class="stack">
            <Button icon={plusIcon}>Create Worker</Button>
            <Button variant="primary" icon={plusIcon}>Create Worker</Button>
            <Button loading>Create Worker</Button>
          </div>
        {:else if item.label === "Checkbox"}
          <Checkbox label="Max bandwidth" bind:checked />
        {:else if item.label === "Clipboard Text"}
          <ClipboardText text="npx kumo add button" />
        {:else if item.label === "Cloudflare Logo"}
          <CloudflareLogo class="cloudflare-preview" />
        {:else if item.label === "CodeHighlighted"}
          <CodeBlock
            lang="ts"
            code={`const sum = (a: number, b: number) => {
  return a + b;
};`}
          />
        {:else if item.label === "Collapsible"}
          <CollapsibleRoot>
            <CollapsibleDefaultTrigger>What is Kumo?</CollapsibleDefaultTrigger>
            <CollapsibleDefaultPanel>Kumo is Cloudflare's component library.</CollapsibleDefaultPanel>
          </CollapsibleRoot>
        {:else if item.label === "Combobox"}
          <Combobox items={issueItems} bind:open={comboboxOpen}>
            <ComboboxTriggerInput placeholder="Select an issue..." />
          </Combobox>
        {:else if item.label === "Command Palette"}
          <CommandPalette class="command-preview">
            <CommandPaletteInput placeholder="Search..." />
            <CommandPaletteList>
              <CommandPaletteGroup>
                <CommandPaletteGroupLabel>Actions</CommandPaletteGroupLabel>
                <CommandPaletteItem value="deploy">Deploy Worker</CommandPaletteItem>
                <CommandPaletteItem value="logs">Open Logs</CommandPaletteItem>
              </CommandPaletteGroup>
            </CommandPaletteList>
          </CommandPalette>
        {:else if item.label === "Date Picker"}
          <DatePicker mode="single" />
        {:else if item.label === "Dialog"}
          <DialogRoot>
            <DialogTrigger class="kumo-demo-trigger">Click me!</DialogTrigger>
            <DialogContent>
              <DialogTitle>Hello!</DialogTitle>
              <DialogDescription>I'm a dialog.</DialogDescription>
            </DialogContent>
          </DialogRoot>
        {:else if item.label === "Dropdown"}
          <DropdownMenuRoot>
            <DropdownMenuTrigger class="kumo-demo-trigger">+ Add</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Worker</DropdownMenuItem>
              <DropdownMenuItem>Pages</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        {:else if item.label === "Empty"}
          <Empty title="No results" description="Try a different search" size="sm" />
        {:else if item.label === "Flow"}
          <Flow canvas={false} class="flow-preview">
            <FlowNode id="step-1">Step 1</FlowNode>
            <FlowNode id="step-2">Step 2</FlowNode>
          </Flow>
        {:else if item.label === "Grid"}
          <Grid variant="side-by-side" gap="sm" class="grid-preview">
            <GridItem class="grid-cell">1</GridItem>
            <GridItem class="grid-cell">2</GridItem>
            <GridItem class="grid-cell">3</GridItem>
            <GridItem class="grid-cell">4</GridItem>
          </Grid>
        {:else if item.label === "Input"}
          <div class="stack">
            <Input placeholder="Type something..." />
            <Input variant="error" value="Invalid!" />
          </div>
        {:else if item.label === "InputArea"}
          <InputArea placeholder="Enter your notes" rows={3} />
        {:else if item.label === "InputGroup"}
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput value="example.com" aria-label="Domain" />
            <InputGroupSuffix>.workers.dev</InputGroupSuffix>
          </InputGroup>
        {:else if item.label === "Label"}
          <div class="stack tight">
            <Label>Default Label</Label>
            <Label showOptional>Optional Field</Label>
            <Label tooltip={labelTooltip}>With Tooltip</Label>
          </div>
        {:else if item.label === "Layer Card"}
          <LayerCard class="layer-preview">
            <LayerCardSecondary>Next Steps</LayerCardSecondary>
            <LayerCardPrimary>Hello</LayerCardPrimary>
          </LayerCard>
        {:else if item.label === "Link"}
          <div class="stack tight">
            <Link href="#">Default link</Link>
            <Link href="#" variant="current">Current color link</Link>
            <Link href="#" variant="plain">Plain link</Link>
          </div>
        {:else if item.label === "Loader"}
          <Loader />
        {:else if item.label === "MenuBar"}
          <MenuBar
            isActive={menuBarActive}
            options={[
              { icon: boldIcon, onClick: () => (menuBarActive = menuBarActive === 0 ? undefined : 0), tooltip: "Bold" },
              { icon: italicIcon, onClick: () => (menuBarActive = menuBarActive === 1 ? undefined : 1), tooltip: "Italic" },
            ]}
          />
        {:else if item.label === "Meter"}
          <Meter value={75} label="My meter" customValue="100 / 5,000" class="meter-preview" />
        {:else if item.label === "Pagination"}
          <Pagination
            page={paginationPage}
            perPage={10}
            totalCount={100}
            setPage={setPaginationPage}
            controls="simple"
            class="pagination-preview"
          />
        {:else if item.label === "Popover"}
          <PopoverRoot>
            <PopoverTrigger class="kumo-demo-trigger">Open Popover</PopoverTrigger>
            <PopoverContent>
              <PopoverTitle>Popover Title</PopoverTitle>
              <PopoverDescription>This is a popover.</PopoverDescription>
            </PopoverContent>
          </PopoverRoot>
        {:else if item.label === "Radio"}
          <RadioGroup legend="Select option" defaultValue="option1">
            <RadioItem value="option1" label="Option 1" />
            <RadioItem value="option2" label="Option 2" />
          </RadioGroup>
        {:else if item.label === "Select"}
          <Select aria-label="Select version" placeholder="Select version" items={versionItems} />
        {:else if item.label === "Sensitive Input"}
          <SensitiveInput value="super-secret-api-key" readOnly />
        {:else if item.label === "Sidebar"}
          <SidebarProvider collapsible="none" style="--sidebar-width: 180px;">
            <Sidebar class="sidebar-preview">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Workers</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem><SidebarMenuButton>Overview</SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton>Deployments</SidebarMenuButton></SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </SidebarProvider>
        {:else if item.label === "Skeleton Line"}
          <div class="skeleton-preview">
            <SkeletonLine minWidth={50} maxWidth={100} />
            <SkeletonLine minWidth={100} />
            <SkeletonLine minWidth={50} maxWidth={150} />
          </div>
        {:else if item.label === "Switch"}
          <Switch bind:checked={switchToggled} />
        {:else if item.label === "Table"}
          <Table class="table-preview">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Worker 1</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Worker 2</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        {:else if item.label === "Table of Contents"}
          <TableOfContents>
            <TableOfContentsTitle>On this page</TableOfContentsTitle>
            <TableOfContentsList>
              <TableOfContentsItem active>Introduction</TableOfContentsItem>
              <TableOfContentsItem>Installation</TableOfContentsItem>
              <TableOfContentsItem>Usage</TableOfContentsItem>
            </TableOfContentsList>
          </TableOfContents>
        {:else if item.label === "Tabs"}
          <Tabs tabs={tabItems} />
        {:else if item.label === "Text"}
          <div class="stack tight">
            <Text size="lg" bold>Large Bold Text</Text>
            <Text size="base">Regular text content</Text>
            <Text size="sm" variant="secondary">Small subtle text</Text>
          </div>
        {:else if item.label === "Toast"}
          <Toasty>
            <Button>Give me a toast</Button>
          </Toasty>
        {:else if item.label === "Tooltip"}
          <TooltipProvider>
            <div class="tooltip-preview">
              <Tooltip content="Add" delay={0}>
                <Button shape="square" icon={plusIcon} aria-label="Add" />
              </Tooltip>
              <Tooltip content="Change language">
                <Button shape="square" icon={translateIcon} aria-label="Change language" />
              </Tooltip>
            </div>
          </TooltipProvider>
        {/if}
      </div>
      </article>
    {/each}
  </section>
</TooltipProvider>
