# kumo-svelte

Svelte 5 port of Cloudflare's Kumo component library.

This package follows the source-export shape used by `agents-svelte`: Svelte
components and TypeScript helpers are exported directly from `src`.
Where upstream Kumo uses Base UI primitives, this port uses Bits UI primitives
and keeps Kumo's styling and variant metadata on top.

## Current Scope

The first porting slice includes:

- `Badge`
- `Banner`
- `Button`, `RefreshButton`, and `LinkButton` backed by Bits UI `Button`
- `Checkbox`, `CheckboxGroup`, `CheckboxItem`, and `CheckboxLegend` backed by Bits UI `Checkbox`
- `Code` and `CodeBlock`
- `Collapsible` root/trigger/panel components backed by Bits UI `Collapsible`
- `Dialog`, `DialogRoot`, `DialogTrigger`, `DialogTitle`, `DialogDescription`, and `DialogClose` backed by Bits UI `Dialog` / `AlertDialog`
- `DropdownMenu` compound components backed by Bits UI `DropdownMenu`
- `Empty`
- `Field`
- `Grid` and `GridItem`
- `Input`, `InputArea`, and `Textarea`
- `Label` backed by Bits UI `Label`
- `LayerCard`, `LayerCardPrimary`, and `LayerCardSecondary`
- `Link` and `ExternalIcon`
- `Loader` and `SkeletonLine`
- `Meter` backed by Bits UI `Meter`
- `Popover` root/trigger/content/title/description/close components backed by Bits UI `Popover`
- `Radio`, `RadioGroup`, `RadioItem`, and `RadioLegend` backed by Bits UI `RadioGroup`
- `Select`, `SelectOption`, grouping, and separator components backed by Bits UI `Select`
- `Surface`
- `Switch`, `SwitchGroup`, `SwitchItem`, and `SwitchLegend` backed by Bits UI `Switch`
- `Tabs` convenience and primitive wrapper components backed by Bits UI `Tabs`
- `Text`
- `Tooltip` and `TooltipProvider` backed by Bits UI `Tooltip`
- `cn()` and `resolveVariant()`
- Kumo style exports

Import the Kumo CSS once in your app:

```ts
import "kumo-svelte/styles";
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
