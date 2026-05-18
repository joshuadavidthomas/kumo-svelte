# Porting Audit

Date: 2026-05-18

## Objective

Port Cloudflare's Kumo package from React/Base UI to Svelte 5, using:

- `reference/cloudflare-kumo` as the source API and behavior reference.
- Bits UI where upstream Kumo used Base UI primitives.
- `reference/shadcn-svelte` as a Svelte/Bits UI component-library reference, not as a direct dependency.
- `reference/agents-svelte` as the package layout model: pnpm, source exports, and Svelte-first code.

## Evidence Checked

- `find reference/cloudflare-kumo/packages/kumo/src/components -mindepth 1 -maxdepth 1 -type d`
- `find src/components -mindepth 1 -maxdepth 1 -type d`
- `jq -r '.exports | keys[]' reference/cloudflare-kumo/packages/kumo/package.json`
- `jq -r '.exports | keys[]' package.json`
- `pnpm check`
- `git status --short --branch`

## Completed

- All upstream top-level component directories under `src/components` have Svelte counterparts.
- Components that map to Base UI overlay/form primitives use Bits UI rather than a local primitive layer.
- Bits UI is documented as the lower-level primitive layer; `kumo-svelte` does not export `./primitives`.
- Bits-backed public components follow the package wrapper model rather than
  leaking a raw primitive export surface. Wrapper parts expose stable
  `data-slot` anatomy markers across select, dialog, popover, tooltip,
  dropdown menu, tabs, collapsible, checkbox, radio, switch, button, label,
  combobox, autocomplete, command palette, sidebar, meter, date picker,
  clipboard text, input group buttons, and menubar.
- Tooltip consumers that previously wired Bits tooltip primitives directly now
  use the local tooltip wrappers; Bits tooltip imports are isolated to the
  tooltip component package.
- Sidebar collapsible exports are local wrapper components, not raw
  `bits-ui` primitive re-exports.
- The package follows source exports in the style of `agents-svelte`.
- `phosphor-svelte` is used for Phosphor icons.
- `tailwind-merge` is kept for `cn()`.
- `tailwind-variants` is not added; current Kumo variant metadata remains simple enough for `resolveVariant()`.
- Shiki highlighting is isolated behind `kumo-svelte/code`, matching upstream's separate code entrypoint.
- `KumoPortalProvider` and `LinkProvider` are ported for non-primitive public utility behavior.
- `DeleteResource` is ported because upstream exports it from the root package.
- Style entrypoints expose the existing Tailwind, standalone, Kumo, binding, and theme CSS files.
- Registry TypeScript types are available from `kumo-svelte/registry`.
- Registry metadata is generated from source `*Props` interfaces and
  `variants.ts` files, including variant values, defaults, classes,
  descriptions, base styles, simple generated examples, upstream TSX demo
  snippets, and explicit `KUMO_*_STYLING` objects where present.
- Registry generation also fills common public prop descriptions for repeated
  props such as `class`, `children`, `disabled`, `value`, labels, placeholders,
  portal containers, and common callbacks.
- Registry generation fills every remaining prop description with conservative
  generated prose derived from the prop name and type, after source JSDoc,
  variant metadata, docs frontmatter, and common descriptions have had priority.
- Registry generation extracts component-level descriptions from upstream Kumo
  docs frontmatter when the checked-in reference docs are available, with
  fallback descriptions for components that do not have a dedicated docs page.
- Registry generation includes the raw upstream MDX documentation under
  `upstreamDocs` when a checked-in upstream docs page declares the matching
  `sourceFile`.
- Catalog validation checks known component names, element/tree shape, props
  object shape, and literal variant prop values. Dynamic `{ path }` values pass
  through for runtime binding.
- Catalog validation also checks simple generated primitive prop types
  (`string`, `number`, `boolean`, and simple primitive arrays/unions) for
  literal values.
- Registry generation extracts string literal union values from source prop
  types so catalog validation can reject invalid non-variant option values.
- Catalog validation additionally checks generated array-like, record/object,
  function, snippet, and string-or-number prop types when those checks can be
  inferred conservatively from the generated type string.
- Registry generation now emits AST-derived runtime validation metadata for
  representable TypeScript prop shapes, including local type aliases and
  interfaces, arrays, records, object literals, literal unions, snippets, and
  function props. Catalog validation uses this metadata before falling back to
  string-based primitive checks.
- Every generated prop now has either runtime validation metadata or literal
  value validation. Opaque external types use conservative runtime categories
  such as string, object, function, array, or a union of those categories.

## Current Gates

- `pnpm check` passes.
- `pnpm test` passes.
- `main` is pushed and clean against `origin/main`.

## Remaining Gaps

The upstream non-primitive package export keys now exist in `package.json`,
excluding intentionally omitted `./primitives/*` exports.

The generated metadata surfaces are currently basic:

- `./registry/component-registry.json`
- `./registry/component-registry.md`
- `./ai/component-registry.json`
- `./ai/schemas`
- `./catalog`

They are generated from the Svelte package export list, source `*Props`
interfaces, source variant metadata, and upstream docs frontmatter where
available. They validate tree shape and known component names. They include prop
names, type strings, required flags, component descriptions, variant
values, variant defaults, variant classes, variant descriptions, base styles,
common prop descriptions, simple generated examples, upstream MDX docs under
`upstreamDocs`, upstream TSX demo snippets under `upstreamExamples`, and
explicit styling metadata where present. Runtime catalog validation uses the
generated prop metadata for literal variant checks, AST-derived runtime checks,
and simple string-derived primitive fallbacks.

Prop description coverage is complete, but descriptions without source JSDoc,
variant metadata, docs frontmatter, or common-description matches use generated
fallback prose rather than upstream-authored copy.

Runtime validation is complete at the catalog boundary, but opaque external
types such as portal targets, ECharts instances, date-library values, and HTML
element references are validated by broad runtime category rather than by the
full third-party TypeScript shape.

## Intentional Differences

- Upstream `./primitives` exports are intentionally omitted. Use `bits-ui` directly.
- Internal component wrappers still import Bits UI primitives directly. This is
  the intended base layer; the package does not provide a second generic
  primitive namespace.
- Upstream React `useMenuNavigation` is omitted because the Svelte `MenuBar` is backed by Bits UI `Toolbar`, which owns keyboard navigation.
- Pagination remains local because upstream Kumo's pagination was also local React state, not Base UI.

## Completion Rule

Do not mark the port complete until the generated metadata/catalog surfaces have
upstream-equivalent prop descriptions, extracted demo examples, and complex prop
validation, or that metadata work is explicitly declared out of scope by the
maintainer.
