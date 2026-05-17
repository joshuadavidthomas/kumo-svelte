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

They are generated from the Svelte package export list and validate tree shape
and known component names. They do not yet include upstream-equivalent prop-level
schemas, extracted examples, style metadata, or rich component documentation.

## Intentional Differences

- Upstream `./primitives` exports are intentionally omitted. Use `bits-ui` directly.
- Upstream React `useMenuNavigation` is omitted because the Svelte `MenuBar` is backed by Bits UI `Toolbar`, which owns keyboard navigation.
- Pagination remains local because upstream Kumo's pagination was also local React state, not Base UI.

## Completion Rule

Do not mark the port complete until the generated metadata/catalog surfaces have
upstream-equivalent prop-level schemas and registry metadata, or that metadata
work is explicitly declared out of scope by the maintainer.
