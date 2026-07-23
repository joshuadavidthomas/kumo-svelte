# Parity capture configuration

Put temporary proof configuration and fixtures under `.amp/`; they are ignored by Git. Durable product and docs changes belong in their normal package paths.

```json
{
  "id": "button-disabled",
  "release": {
    "package": "@cloudflare/kumo",
    "version": "2.8.0",
    "tag": "@cloudflare/kumo@2.8.0",
    "commit": "d4ab7bafc9d1e33deb19cbfe6b52c4e0dec8b7ff"
  },
  "feature": {
    "source": "packages/kumo/src/components/button/button.tsx@d4ab7baf",
    "includedInRelease": "git show d4ab7baf:packages/kumo/src/components/button/button.tsx"
  },
  "localBaseSha": "8ebcac11b93c7e13579786e7e2ae49bece7839ae",
  "frameworks": {
    "react": { "portal": "kumo-react-docs" },
    "svelte": { "portal": "kumo-svelte-docs" }
  },
  "fixturePaths": [
    ".amp/upstream/kumo/packages/kumo-docs-astro/src/pages/components/button.mdx",
    "packages/kumo-svelte-docs/src/routes/(docs)/components/button/+page.svx"
  ],
  "integrationPaths": ["packages/kumo-svelte/src/components/button"],
  "scenarios": [
    {
      "id": "desktop-light-disabled",
      "path": "/components/button",
      "viewport": { "width": 1280, "height": 720 },
      "colorScheme": "light",
      "reducedMotion": "reduce",
      "captureSelector": {
        "react": "main",
        "svelte": "main"
      },
      "actions": [
        {
          "type": "focus",
          "selector": {
            "react": "button:has-text(Disabled)",
            "svelte": "button:has-text(Disabled)"
          },
          "afterMs": 100
        }
      ],
      "observations": [
        {
          "id": "disabled-attribute",
          "selector": "button:has-text(Disabled)",
          "kind": "attribute",
          "name": "disabled",
          "expected": ""
        }
      ],
      "recordVideo": true
    }
  ]
}
```

## Endpoint and scenario fields

- Each framework endpoint has either a `portal` service name or an explicit reviewable `url`.
- The browser accepts the orb portal's internal certificate chain while retaining the public review URL in evidence; do not use this as a reason to bypass authentication or host-policy failures.
- `release.commit` must be the exact 40-character release SHA. For the managed `kumo-react-docs` portal, the runner verifies that SHA against the comparison checkout and fails on a mismatch. An explicit React URL is recorded as release-provenance-unverified because it cannot attest a Git commit by itself.
- `feature.includedInRelease` records the command, source link, or ancestry evidence a reviewer used to establish feature inclusion. It is useful provenance, not machine verification merely because it is present; inspect that evidence as part of the release gate.
- `fixturePaths` and `integrationPaths` may name files or directories. Their sorted file hashes preserve proof-fixture and product-change provenance separately, including untracked files.
- `path`, `captureSelector`, action `selector`, and observation `selector` may be a common value or `{ "react": ..., "svelte": ... }` when framework markup differs. Use `expected` for a common observable value or `expectedByFramework` with both framework keys for intentional differences.
- Defaults are viewport `1280x720`, device scale factor `1`, light color scheme, no reduced-motion preference, `body` capture, and a 250 ms settling wait.
- Set `fullPage: true` only when page-level overflow is part of the proof. A capture selector usually gives more stable component evidence.
- Set `recordVideo: true` for interaction, motion, scrolling, focus movement, navigation, resize, or dynamic layout. Explain why screenshots suffice when the proof is static.
- Supported actions are `click`, `fill`, `focus`, `hover`, `press`, and `wait`. Use `value` for fill, `key` for press, `ms` for wait, and optional `afterMs` for settling after other actions.
- Supported observations are `aria`, `attribute`, `html`, `property`, and `text`. Every observation requires an explicit expected value. Use narrow semantic observations instead of asserting framework-generated IDs or incidental wrapper markup.
- `requestHeaders` may contain non-secret fixture headers. Never put credentials in a config or artifact.

## Workflow

1. Start or verify the two supervised docs services with `amp orb services ensure`.
2. Create equivalent, framework-idiomatic fixtures and list their paths in `fixturePaths`.
3. Run `pnpm parity:proof --config .amp/parity-proof.json --dry-run` and inspect the matched plan.
4. Run `pnpm parity:proof --config .amp/parity-proof.json`.
5. Open `.amp/in/artifacts/parity/<id>/index.html`; inspect every final React/Svelte screenshot and WEBM pair.
6. Read `evidence.json` for SSR/hydrated DOM, accessibility, assertions, runtime errors, hashes, and provenance.
7. Copy `review-template.json` to a separate review record, identify the reviewer, record each visual/interaction verdict, and explain every discrepancy as a blocker, intentional Svelte adaptation, or pre-existing difference. Only then apply the skill’s verdict gate. Do not alter generated observations.

The command exits nonzero when assertions, console errors, or page errors are recorded, no assertions are configured, or release provenance is unverified. Console warnings are preserved for review without automatically failing a scenario. Capture failures include the scenario and framework in the diagnostic. Regardless of exit status, generated output never claims visual parity or readiness to ship.

## Architectural inspiration and adjacent authority layers

[acoyfellow/kumo-compiler](https://github.com/acoyfellow/kumo-compiler) is architectural inspiration for the evidence philosophy used here: observable behavior contracts and vectors, framework-idiomatic differential comparison, fail-closed evidence states, provenance-linked evidence, semantic/interaction/SSR/hydration proof, and eventual installed-package conformance. This runner mines those proof ideas; it does **not** adopt kumo-compiler’s framework-neutral IR or generated Svelte emitter. Kumo Svelte remains an idiomatic Svelte 5 implementation using its established Bits UI and shadcn-svelte patterns.

The repository now ships three adjacent, separately enforced authorities:

- package-owned observable contracts run with the package test suite;
- `pnpm upstream:coverage` checks the exact installed package against the accepted factual baseline and checks component-subpath export inventory correspondence and reviewed differences, never behavioral parity;
- `pnpm test:packed-consumer` checks the packed package from a consumer installation.

None of those gates is an aggregate parity score or an automatic release verdict. Paired React/Svelte capture remains on demand, its review remains human-authored, and promotion of an exploratory `.amp` scenario into a committed observable contract remains a deliberate reviewed change.

## Updating the accepted upstream release

Use the [upstream maintenance runbook](upstream-maintenance.md). Keep this page focused on configuring and reviewing an individual on-demand paired proof.
