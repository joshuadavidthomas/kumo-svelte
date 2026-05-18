# kumo-svelte

Svelte 5 port of Cloudflare's Kumo component library.

This package follows the source-export shape used by `agents-svelte`: Svelte
components and TypeScript helpers are exported directly from `src`.
Where upstream Kumo uses Base UI primitives, this port uses Bits UI primitives
and keeps Kumo's styling and variant metadata on top.

## Current Scope

The current port includes all top-level component groups from upstream Kumo:

- `Autocomplete` components backed by Bits UI `Combobox`
- `Badge`
- `Banner`
- `Breadcrumbs` root/link/current/separator/ellipsis/clipboard components
- `Button`, `RefreshButton`, and `LinkButton` backed by Bits UI `Button`
- `Chart`, `TimeseriesChart`, `SankeyChart`, and chart legend helpers backed by ECharts
- `Checkbox`, `CheckboxGroup`, `CheckboxItem`, and `CheckboxLegend` backed by Bits UI `Checkbox`
- `ClipboardText`
- `CloudflareLogo` and `PoweredByCloudflare`
- `Code`, `CodeBlock`, and the Shiki-backed `CodeHighlighted` entrypoint
- `Collapsible` root/trigger/panel components backed by Bits UI `Collapsible`
- `Combobox` components backed by Bits UI `Combobox`
- `CommandPalette` components backed by Bits UI `Command`
- `DatePicker` backed by Bits UI `Calendar`
- `DateRangePicker` backed by Bits UI `RangeCalendar`
- `DeleteResource`
- `Dialog` convenience and primitive wrapper components backed by Bits UI `Dialog` / `AlertDialog`
- `DropdownMenu` compound components backed by Bits UI `DropdownMenu`
- `Empty`
- `Field`
- `Flow`, `FlowNode`, `FlowList`, `FlowParallel`, and `FlowAnchor`
- `Grid` and `GridItem`
- `Input`, `InputArea`, and `Textarea`
- `InputGroup`, `InputGroupInput`, `InputGroupButton`, `InputGroupAddon`, and `InputGroupSuffix`
- `Label` backed by Bits UI `Label`
- `LayerCard`, `LayerCardPrimary`, and `LayerCardSecondary`
- `Link` and `ExternalIcon`
- `Loader` and `SkeletonLine`
- `MenuBar`
- `Meter` backed by Bits UI `Meter`
- `Pagination` root/info/page-size/controls/separator components
- `Popover` root/trigger/content/title/description/close components backed by Bits UI `Popover`
- `Radio`, `RadioGroup`, `RadioItem`, and `RadioLegend` backed by Bits UI `RadioGroup`
- `Select` convenience and primitive wrapper components backed by Bits UI `Select`
- `SensitiveInput`
- `Sidebar`
- `Surface`
- `Switch`, `SwitchGroup`, `SwitchItem`, and `SwitchLegend` backed by Bits UI `Switch`
- `TableOfContents` root/title/list/item/group components
- `Tabs` convenience and primitive wrapper components backed by Bits UI `Tabs`
- `Table` and table section/cell helpers
- `Text`
- `Toast` backed by `svelte-sonner`
- `Tooltip` and `TooltipProvider` backed by Bits UI `Tooltip`
- `KumoPortalProvider`, `LinkProvider`, `cn()`, and `resolveVariant()`
- Registry metadata from `kumo-svelte/registry`, including component props,
  upstream component descriptions, common prop descriptions, generated examples,
  variant values, variant classes, defaults, and available style metadata
- Catalog validation from `kumo-svelte/catalog` for UI tree shape, known
  components, literal variant prop values, and simple primitive prop values
- Kumo style exports

Kumo styles are Tailwind utility classes plus the Kumo CSS variables and
component CSS. Import Tailwind and the Kumo CSS once in your app:

```css
@import "tailwindcss";
@import "kumo-svelte/styles";
```

The upstream-style aliases are also available:

```css
@import "kumo-svelte/styles/tailwind";
@import "kumo-svelte/styles/standalone";
```

Then use components from the root package or component subpaths:

```svelte
<script lang="ts">
  import { Badge, Button, Text } from "kumo-svelte";
</script>

<Text variant="heading1" as="h1">Workers</Text>
<Badge variant="green">Active</Badge>
<Button variant="primary">Create</Button>
```

When you need lower-level composition, use Bits UI directly. `kumo-svelte`
builds Kumo components on those primitives, but does not re-export them:

```ts
import { Dialog, Popover, Select } from "bits-ui";
```

## Dependency Policy

This port leans on the Svelte ecosystem instead of rebuilding common primitives:

- Bits UI is the primitive layer. Use it directly for lower-level composition;
  `kumo-svelte` does not re-export a primitives namespace.
- Phosphor icons come from `phosphor-svelte`, matching upstream Kumo's Phosphor
  icon dependency.
- Tailwind CSS is a peer dependency because Kumo component classes are Tailwind
  utilities.
- `tailwind-merge` stays because `cn()` needs Tailwind-aware conflict merging.
- `tailwind-variants` is intentionally not included yet; Kumo's current variant
  metadata is simple enough for `resolveVariant()`. Add it only when a component
  grows slot-heavy variant logic.
- `@internationalized/date` stays for Bits UI calendar values.
- `svelte-sonner` replaces the notification plumbing for toast components.
- `echarts` is a peer dependency because chart components wrap caller-provided
  ECharts modules.
- `shiki`, `@shikijs/langs`, and `@shikijs/themes` are isolated behind
  `kumo-svelte/code`, matching upstream Kumo's separate syntax-highlighting
  entrypoint.
- Upstream Kumo's `motion` and `zod` dependencies are not included yet. Current
  Svelte components do not need them: flow uses local SVG geometry, and no
  schema-driven public API has been ported.
