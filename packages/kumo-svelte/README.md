# kumo-svelte

Svelte 5 components inspired by [Cloudflare's Kumo design system](https://github.com/cloudflare/kumo).

`kumo-svelte` brings Kumo's visual language, semantic tokens, and component patterns to Svelte. It uses [Bits UI](https://bits-ui.com/) for accessible primitives and keeps the public API Svelte-shaped.

> [!NOTE]
> This is a community package, not an official Cloudflare package. Expect API and parity fixes before `1.0`.

## Installation

```bash
pnpm add kumo-svelte
```

Install the peer dependencies if your app does not already have them:

```bash
pnpm add svelte tailwindcss
```

Chart components also need ECharts:

```bash
pnpm add echarts
```

Import Tailwind and Kumo styles once in your app-level CSS:

```css
@import "tailwindcss";
@import "kumo-svelte/styles";
```

Additional style entrypoints are available if you want explicit files:

```css
@import "kumo-svelte/styles/tailwind";
@import "kumo-svelte/styles/standalone";
```

Kumo themes use semantic CSS variables. Set `data-mode="dark"` on a parent element to use dark mode.

Use this package from a Svelte 5 app built with Vite or another toolchain that supports Svelte package exports.

## Getting Started

Import components from their subpaths:

```svelte
<script lang="ts">
  import { Badge } from "kumo-svelte/components/badge";
  import { Button } from "kumo-svelte/components/button";
  import { Text } from "kumo-svelte/components/text";
</script>

<Text variant="heading1" as="h1">Workers</Text>
<Badge variant="green">Active</Badge>
<Button variant="primary">Create</Button>
```

## Usage

Compound components use Svelte bindings and snippets where they fit:

```svelte
<script lang="ts">
  import * as Tabs from "kumo-svelte/components/tabs";

  let value = $state("overview");
</script>

<Tabs.Root bind:value>
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="overview">Overview content</Tabs.Content>
  <Tabs.Content value="settings">Settings content</Tabs.Content>
</Tabs.Root>
```

Single controls stay direct:

```svelte
<script lang="ts">
  import { Checkbox } from "kumo-svelte/components/checkbox";

  let checked = $state(false);
</script>

<Checkbox label="Accept terms and conditions" bind:checked />
```

### Bits UI primitives

Some component families are built on Bits UI. If you need lower-level primitives, import Bits UI directly:

```ts
import { Dialog, Popover, Select } from "bits-ui";
```

## Documentation

- Local docs: run `pnpm docs:dev`
- Upstream Kumo: <https://github.com/cloudflare/kumo>

## Development

```bash
pnpm install
pnpm check
pnpm test
pnpm docs:dev
```

`pnpm check` verifies synced upstream theme files, formatting, linting, and type checking. `pnpm docs:dev` starts the local documentation site.

## License

MIT. See [`LICENSE`](LICENSE).
