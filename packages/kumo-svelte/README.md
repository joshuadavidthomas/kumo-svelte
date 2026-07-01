# kumo-svelte

Svelte 5 components inspired by [Cloudflare's Kumo design system](https://github.com/cloudflare/kumo).

kumo-svelte brings Kumo's visual language, semantic tokens, and component patterns to Svelte. It uses [Bits UI](https://bits-ui.com/) for accessible primitives and keeps the public API Svelte-shaped.

> [!NOTE]
> kumo-svelte is a community package and not associated with Cloudflare, Inc.

## About

kumo-svelte is an experiment in agentic coding and pushing on the limits of automated maintenance for repos, forks, and ports.

It was inspired by [this tweet](https://x.com/dillon_mulroy/status/2055434999545868707) from [Dillon Mulroy](https://github.com/dmmulroy). I wanted a good project to try Codex's `/goal` feature on, and I wanted to see what it would take to not only port the Kumo package from React to Svelte, but port it in a Svelte 5 and Bits UI/shadcn-svelte idiomatic way. Less "port this from React to Svelte, make no mistakes" and more build a sustainable future-forward system that can keep a thoughtful port alive.

That's why this is not published to npm. I waited too long after the initial port, and great minds think alike: there already seems to be a [`kumo-svelte` package](https://github.com/maxffarrell/kumo-svelte) that started around the same time as this. That's fine. I don't really want to maintain this as a public package right now anyway.

The interesting part to me is the maintenance loop: defining a good goal, putting the right guardrails in place, giving the agent the right skills, checking against upstream Kumo, and seeing whether automated agentic runs can keep a Svelte port up to date without turning it into React-in-Svelte. This is an ongoing experiment, and (maybe?) a small look at the future of package/repo maintenance.

## Installation

This package is not published to NPM (yet). If you would like to try it out, install the package from the Git repo subpackage with a VCS URL:

```bash
pnpm add 'https://github.com/joshuadavidthomas/kumo-svelte.git#path:/packages/kumo-svelte'
```

Install the peer dependencies if your app does not already have them:

```bash
pnpm add svelte tailwindcss
```

Chart components, including `TimeseriesChart`, `SankeyChart`, and `BubbleMap`, also need ECharts:

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

- Docs: <https://kumo-svelte.joshthomas.dev>
- Kumo: <https://kumo-ui.com>

## Development

```bash
pnpm install
pnpm check
pnpm test
pnpm docs:dev
```

## License

kumo-svelte is licensed under the MIT license. See the [`LICENSE`](LICENSE) file for more information.
