# Upstream maintenance runbook

Use this runbook to move one exact `@cloudflare/kumo` release from intentional red CI to an accepted Kumo Svelte maintenance change. Commands are ordered and fail fast. Checks produce evidence within their stated boundaries; they do not accept a release or replace human review.

## Authority boundaries

- `package.json`, `pnpm-lock.yaml`, and `.agents/setup` jointly select the exact installed package and managed comparison checkout. They must name one identical, non-range version.
- The installed package exports and reachable TypeScript declarations are upstream machine truth. `scripts/upstream-coverage-baseline.json` records the last PR-accepted machine facts; it does not contain review conclusions.
- `scripts/upstream-coverage-mappings.json` is the maintainer-reviewed authority for React/Svelte inventory correspondence at one exact upstream version. A name match is not behavioral parity.
- Package-owned observable contracts preserve selected accepted local Svelte behavior. Promotion from exploratory evidence is a manual, reviewed product change.
- `pnpm parity:proof` mechanically captures targeted React/Svelte evidence. Its screenshots, recordings, observations, SSR/hydrated DOM, diagnostics, and provenance require a named human review and never generate a ship verdict.
- `pnpm test:packed-consumer` owns the packed-tarball consumer boundary. It currently exercises six selected vectors across Button, Input, and Collapsible in one Chromium engine; this calibration is not package-wide coverage.
- `pnpm maintenance:check` is the one automated fan-in gate. CI runs it serially after a frozen install and Chromium installation. It deliberately excludes the on-demand paired portal proof.

## Update one exact release

1. **Establish the comparison.** Start from current `origin/main`, record the local base SHA, target package version and tag, exact release commit, release notes, and the exact release source range. Confirm the feature or change is included in that release; do not compare against upstream `main`.
2. **Change all three pins together.** Set root `devDependencies["@cloudflare/kumo"]` in `package.json` to the exact version, update the root importer and resolved package identity/integrity in `pnpm-lock.yaml` with `pnpm install --lockfile-only`, and set `.agents/setup`'s `upstream_ref` to the same exact `@cloudflare/kumo@<version>` tag. Run `.agents/setup` (or its equivalent checkout/install steps), then `pnpm install --frozen-lockfile`. Do not use a range.
3. **Observe the expected red gate.** Run `pnpm upstream:coverage`. A valid new version must exit 1 as `review-required`, even if exported names and declaration bytes are unchanged. Exit 2 is `blocked`, not expected drift: repair the named authority before review. Do not update the accepted baseline yet.
4. **Review before implementing.** Read the release notes, release-bounded source, focused upstream tests, and docs. Inspect every reported `component:<family>` evidence key and any adjacent family made risky by shared primitives or styles. Update `scripts/upstream-coverage-mappings.json` to the new `reviewedUpstreamVersion` only after reviewing each changed correspondence, reason, and source witness.
5. **Collect targeted paired proof.** For affected behavior, rendering, accessibility, visuals, interaction, SSR, or hydration, make equivalent framework-idiomatic fixtures and follow [the parity capture workflow](configuration.md). Dry-run first, then capture. A human must inspect every final image and applicable recording, verify expected/observed values and provenance, classify discrepancies, and preserve a separate review record. Capture completion is not acceptance.
6. **Implement idiomatically.** Port semantics using established Svelte 5, Bits UI, and shadcn-svelte patterns rather than React APIs or mechanics. Update focused implementation tests and docs. Where a reviewed behavior should become durable, manually translate only stable accepted outcomes into package-owned observable contract vectors; never auto-promote generated proof.
7. **Exercise the packed boundary.** Run `pnpm test:packed-consumer`. Fix packaging, export resolution, tarball install, consumer typecheck, client build, SSR render, hydration preservation, real-browser interactions, or diagnostics at the owning layer. Add or change a packed vector only when the selected durable contract scope intentionally changes.
8. **Update accepted machine facts last.** Only after mappings target the installed exact version and current inventory is fully explained, run `pnpm upstream:baseline:update`. Save the resulting bytes outside the file, run the command again, and require byte identity:

   ```bash
   snapshot="$(mktemp)"
   pnpm upstream:baseline:update
   cp scripts/upstream-coverage-baseline.json "$snapshot"
   pnpm upstream:baseline:update
   cmp "$snapshot" scripts/upstream-coverage-baseline.json
   rm -f "$snapshot"
   ```

   Review the baseline diff in the PR. The command writes deterministic facts; only normal Git/PR review accepts them. Never update the baseline in CI or merely to turn an unexplained gate green.

9. **Run the final gate.** Install Chromium if needed, then run `pnpm maintenance:check`. Run `git diff --check`, verify no temporary proof or package-consumer directories remain, and inspect the complete diff. Do not weaken an unrelated gate to accommodate an upstream change.

## Failure classification

| Failure class               | Typical signal                                                                                             | Fix this authority; do not weaken unrelated gates                                                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Upstream authority or drift | pin mismatch, exit 1 `review-required`, exit 2 baseline/package/lock/setup error                           | Correct exact package/lock/setup identity, or review the reported baseline drift. Do not rewrite accepted truth before review.                                      |
| Reviewed mappings           | stale version, declaration witness, duplicate/inert review, unexplained export                             | Re-review and edit `upstream-coverage-mappings.json` reasons and source witnesses. Do not rename local APIs just to manufacture name matches.                       |
| Svelte implementation       | focused component tests or reviewed outcomes differ                                                        | Fix idiomatic component behavior at the owning component/shared primitive. Do not patch the proof harness around a defect.                                          |
| Observable contracts        | malformed schema, incomplete receipt, wrong expected/observed outcome                                      | Fix the fixture/implementation, or deliberately promote a human-reviewed stable outcome. Do not normalize a mismatch to green.                                      |
| Paired fixtures or runner   | invalid config, provenance failure, assertion/console/page error, unmatched scenario                       | Fix release-bounded fixture/config or runner infrastructure, recapture, and repeat human review. Do not put the portal proof in CI or infer a verdict from capture. |
| Packed artifact or browser  | missing export/file, tarball leakage, install/type/client/SSR/hydration/vector failure, browser diagnostic | Fix package metadata/source or the packed harness only when its assertion is wrong. Do not resolve workspace source or filter diagnostics.                          |
| Docs or production build    | generated API docs, Svelte check, or Vite build failure                                                    | Fix public docs/example/API source or docs configuration. Do not skip production build.                                                                             |
| Theme synchronization       | generated theme bytes differ from exact upstream styles                                                    | Review upstream theme change, then run `pnpm sync:upstream-theme` and inspect the generated diff. Do not hand-edit generated theme files.                           |
| Environment                 | frozen install, Node/pnpm, Chromium, network, memory, or managed checkout failure                          | Restore `.node-version`, `packageManager`, lockfile, browser, or setup prerequisites. Preserve serial execution; do not classify infrastructure as parity failure.  |

`failed` means an assertion executed and mismatched. `blocked` means a named prerequisite prevented a trustworthy assertion. `not-run` means no execution evidence exists. Keep these states distinct.

## Bounded adversarial rehearsal

Reuse the shipped tests; do not mutate accepted files or build a mutation framework:

```bash
node --test --test-name-pattern='version bump|stable exported names|missing, malformed, unsupported, and stale baselines' scripts/report-upstream-coverage.test.mjs
pnpm --filter kumo-svelte exec vitest run tests/observable/observable-contracts.test.ts
node --test --test-concurrency=1 scripts/test-packed-package-consumer.test.mjs
pnpm upstream:coverage
```

These checks prove that synthetic version-only drift requires review; stable-name declaration-content drift reports its `component:<family>` key; malformed or stale baselines block; wrong local observable and packed-browser outcomes fail; hydration, console, and page diagnostics fail; and the current exact accepted baseline remains unchanged and green. They rehearse detector sensitivity only and do not modify accepted truth.

## Definition of done

An upstream maintenance change is complete when exact package/lock/setup pins agree; release notes and exact release source were reviewed; all affected evidence keys and mappings are current; targeted paired proof received recorded human review where relevant; implementation and docs remain idiomatic; selected durable contracts were deliberately promoted; packed browser proof passes; the baseline update is byte-identical on a second run and accepted in PR review; `pnpm maintenance:check` and `git diff --check` pass; temporary files are removed; and limitations are reported without a score.

## Explicit non-goals

This experimental system does not provide compiler IR, generated Svelte, receipt DAGs, immutable evidence storage, a two-clean-clone ceremony, publishing automation, rollback infrastructure, Dependabot policy, public runtime metadata, an all-component test matrix, or aggregate readiness/parity scores. It does not make the on-demand paired portal proof a CI job, certify accessibility or pixel parity, or turn six Chromium vectors into a package-wide claim.
