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

`scripts/upstream-coverage-baseline.json` schema 1 contains machine-observed facts only: the exact `@cloudflare/kumo` version, root and resolved lock identity and integrity, installed package manifest hash, canonical component-family export paths, exported declaration names, and per-family digests over the reachable installed declaration graph. `scripts/upstream-coverage-mappings.json` schema 2 remains the sole authority for reviewed React-to-Svelte correspondence decisions. Neither file proves runtime behavior.

The normal `pnpm upstream:coverage` command is read-only. It compares the internally consistent installed/workspace/lock/managed-checkout authority to the accepted baseline and reports a closed state:

- `unchanged` exits 0: accepted and current machine facts match and current coverage is fully explained;
- `review-required` exits 1: the version, public family/export inventory, declaration names, reachable declaration content, or current correspondence needs review;
- `blocked` exits 2: an authority cannot be read or trusted, including a missing, malformed, unsupported, noncanonical, internally stale, or duplicate baseline; inconsistent package/lock/setup pins; unreadable declarations; malformed mappings; or an empty inventory.

A version change is always `review-required`, even when the export and declaration digests are unchanged. Family additions/removals, declaration-name changes, and declaration-content drift retain their `component:<family>` evidence keys. Baseline drift and unexplained current correspondence are printed separately. The declaration hashes detect review targets; they do not establish behavior, accessibility, SSR, hydration, visual, interaction, or parity outcomes.

Use this release update flow:

1. Bump the exact `@cloudflare/kumo` pin consistently in the root package, lockfile, and `.agents/setup`. The coverage CI step should intentionally remain red with `review-required`.
2. Review upstream release notes and the exact release source. Use the reported affected evidence keys plus high-risk adjacent families to choose focused review targets.
3. Run targeted paired parity proof where behavior, rendering, accessibility, visuals, interaction, SSR, or hydration could have changed. Human-review its screenshots, recordings, observations, and provenance; generated proof does not authorize acceptance.
4. Update the Svelte implementation, observable contracts, packed-browser vectors, docs, and schema-v2 correspondence mappings as needed. The packed consumer still proves only the installed tarball and its six named Chromium vectors.
5. Only after the current mapping version matches the installed version and coverage has no unexplained inventory, run `pnpm upstream:baseline:update`. The command deterministically replaces machine facts and explicitly does not claim review or acceptance.
6. Run the update command a second time and verify it is byte-identical, then run `pnpm upstream:coverage` and the targeted/full validation. Accept the new baseline only through normal Git diff and PR review.

Do not run the baseline update from CI or from the report path, and do not treat a green baseline diff as a parity or release-readiness verdict. Observable contracts continue to preserve selected local behavior, on-demand paired parity evidence remains separately human-reviewed, and packed-browser conformance keeps its narrow installed-package claim.
