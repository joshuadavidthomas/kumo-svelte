# kumo-svelte

Svelte 5 port of Cloudflare's Kumo component library.

This package follows the source-export shape used by `agents-svelte`: Svelte
components and TypeScript helpers are exported directly from `src`.
Where upstream Kumo uses Base UI primitives, this port uses Bits UI primitives
and keeps Kumo's styling and variant metadata on top.

## Current Scope

The first porting slice includes:

- `Autocomplete` components backed by Bits UI `Combobox`
- `Badge`
- `Banner`
- `Breadcrumbs` root/link/current/separator/ellipsis/clipboard components
- `Button`, `RefreshButton`, and `LinkButton` backed by Bits UI `Button`
- `Checkbox`, `CheckboxGroup`, `CheckboxItem`, and `CheckboxLegend` backed by Bits UI `Checkbox`
- `ClipboardText`
- `CloudflareLogo` and `PoweredByCloudflare`
- `Code` and `CodeBlock`
- `Collapsible` root/trigger/panel components backed by Bits UI `Collapsible`
- `Combobox` components backed by Bits UI `Combobox`
- `CommandPalette` components backed by Bits UI `Command`
- `Dialog`, `DialogRoot`, `DialogTrigger`, `DialogTitle`, `DialogDescription`, and `DialogClose` backed by Bits UI `Dialog` / `AlertDialog`
- `DropdownMenu` compound components backed by Bits UI `DropdownMenu`
- `Empty`
- `Field`
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
- `Select`, `SelectOption`, grouping, and separator components backed by Bits UI `Select`
- `SensitiveInput`
- `Surface`
- `Switch`, `SwitchGroup`, `SwitchItem`, and `SwitchLegend` backed by Bits UI `Switch`
- `TableOfContents` root/title/list/item/group components
- `Tabs` convenience and primitive wrapper components backed by Bits UI `Tabs`
- `Table` and table section/cell helpers
- `Text`
- `Tooltip` and `TooltipProvider` backed by Bits UI `Tooltip`
- `cn()` and `resolveVariant()`
- Kumo style exports

Kumo styles are Tailwind utility classes plus the Kumo CSS variables and
component CSS. Import Tailwind and the Kumo CSS once in your app:

```css
@import "tailwindcss";
@import "kumo-svelte/styles";
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

- Bits UI is the primitive layer. Use it directly for lower-level composition.
- Phosphor icons come from `phosphor-svelte`, matching upstream Kumo's Phosphor
  icon dependency.
- Tailwind CSS is a peer dependency because Kumo component classes are Tailwind
  utilities.
- `tailwind-merge` stays because `cn()` needs Tailwind-aware conflict merging.
- `tailwind-variants` is intentionally not included yet; Kumo's current variant
  metadata is simple enough for `resolveVariant()`. Add it only when a component
  grows slot-heavy variant logic.
