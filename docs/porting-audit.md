# Porting Audit

Date: 2026-05-17

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
  descriptions, base styles, simple generated examples, and explicit
  `KUMO_*_STYLING` objects where present.
- Registry generation also fills common public prop descriptions for repeated
  props such as `class`, `children`, `disabled`, `value`, labels, placeholders,
  portal containers, and common callbacks.
- Registry generation extracts component-level descriptions from upstream Kumo
  docs frontmatter when the checked-in reference docs are available.
- Catalog validation checks known component names, element/tree shape, props
  object shape, and literal variant prop values. Dynamic `{ path }` values pass
  through for runtime binding.
- Catalog validation also checks simple generated primitive prop types
  (`string`, `number`, `boolean`, and simple primitive arrays/unions) for
  literal values.

## Current Gates

- `pnpm check` passes.
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
names, type strings, required flags, upstream component descriptions, variant
values, variant defaults, variant classes, variant descriptions, base styles,
common prop descriptions, simple generated examples, and explicit styling
metadata where present. Runtime catalog validation uses the generated prop
metadata for literal variant checks and simple primitive type checks.

They do not yet include upstream-equivalent natural-language prop descriptions
for every prop, extracted demo examples, full component documentation sections,
or full TypeScript-derived runtime validation for complex prop types.

## Intentional Differences

- Upstream `./primitives` exports are intentionally omitted. Use `bits-ui` directly.
- Upstream React `useMenuNavigation` is omitted because the Svelte `MenuBar` is backed by Bits UI `Toolbar`, which owns keyboard navigation.
- Pagination remains local because upstream Kumo's pagination was also local React state, not Base UI.

## Completion Rule

Do not mark the port complete until the generated metadata/catalog surfaces have
upstream-equivalent prop descriptions, extracted demo examples, and complex prop
validation, or that metadata work is explicitly declared out of scope by the
maintainer.
