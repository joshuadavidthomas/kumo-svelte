---
name: proving-kumo-parity
description: Proves release-bounded behavior, visual, interaction, accessibility, SSR, hydration, and DOM parity between Cloudflare Kumo React and Kumo Svelte while preserving idiomatic Svelte APIs. Use for parity audits, implementation ports, and evidence reviews.
---

# Proving Kumo Parity

Produce reviewable evidence that Kumo Svelte behaves and renders like an authoritative React release. Prove behavior, accessibility, rendering, visuals, and interaction separately; success in one dimension does not imply parity in the others.

React API shape is not a parity target. Use it to understand intent, then express that behavior through idiomatic Svelte 5 APIs and the repository’s existing Bits UI and shadcn-svelte conventions.

## Define the comparison

Before changing code, record:

- the target package version, tag, and exact release commit;
- the exact upstream feature commit or source range;
- proof that the feature is included in the target release;
- the local base SHA;
- the states, interactions, accessibility outcomes, and visual results being compared.

Use source, tests, and docs from the target release—not upstream `main`. Classify post-release findings as deferred work. Never patch a released dependency to emulate unreleased behavior without explicit approval for that exception.

Create a parity matrix before implementation:

| Dimension | Cases to compare |
| --- | --- |
| Behavior | pointer, keyboard, navigation, dynamic updates, cleanup |
| Accessibility | role, name, state, focus order, announcements |
| Rendering | SSR, hydration, DOM attributes, responsive structure |
| Visual | layout, typography, tokens, states, themes, motion |
| Svelte fit | Svelte 5 patterns, Bits UI composition, shadcn-svelte conventions |

The matrix defines the proof scope and prevents a DOM-only check from being reported as complete parity.

## Inspect the authoritative behavior

Read the release source, focused tests, and docs together. Identify:

- behavior explicitly tested upstream;
- behavior implied by implementation but not tests;
- visual states shown in docs;
- accessibility contracts;
- framework-specific implementation details that should be adapted rather than copied.

Port semantics, not React mechanics or prop names. Prefer existing Svelte 5, Bits UI, and shadcn-svelte patterns. Add or change a Svelte API only when necessary to expose the behavior naturally; do not mirror React signatures merely for surface-level compatibility.

## Keep proof reproducible

Compare live authoritative and candidate renders. Keep matched fixture routes available until review is complete.

For repeatable browser evidence, create a small JSON config and run:

```bash
pnpm parity:proof --config .amp/parity-proof.json
```

Start from [`reference/configuration.md`](reference/configuration.md). Run with `--dry-run` first to validate the release metadata, endpoints, matched URLs, viewport/state conditions, actions, observations, and output paths without launching a browser. The runner accepts either explicit reviewable URLs or the existing `kumo-react-docs` and `kumo-svelte-docs` portal names. It writes to `.amp/in/artifacts/parity/<proof-id>/` so proof output remains separate from product changes.

Use the runner for mechanical collection only: matched screenshots, optional WEBM recordings, SSR responses, hydrated DOM, accessibility snapshots, expected-versus-observed assertions, console/page errors, hashes, provenance, and a side-by-side artifact index. A completed capture or passing automated check is **not** a parity or ship verdict. Generated evidence fails closed as `release-provenance-unverified` or remains `awaiting-human-review`, always with `readyToRecommend: false`; inspect the final artifacts and report conclusions separately.

Use the actual reviewable comparison URLs. Treat authentication or host-policy failures as infrastructure blockers; do not silently substitute private loopback-only results and call the proof complete.

Separate temporary proof fixtures from the integration diff. Record fixture paths and hashes so evidence can be traced to the exact inputs. Record the integration patch hash independently and verify proof work did not alter it.

Fixtures must:

- use each framework’s normal component composition to reach equivalent behavior;
- render inside the actual component hierarchy and theme context;
- use equivalent content, state, dimensions, and viewport;
- expose real component styling rather than plain diagnostic labels;
- cover the changed state and adjacent regression-prone states;
- include concise labels outside the reviewed component when needed;
- expose DOM observations separately when attributes are visually invisible.

Do not modify either framework merely to make screenshots match. Record intentional framework adaptations and pre-existing differences.

## Keep the Svelte implementation idiomatic

Verify:

- the API follows local Svelte component conventions rather than React signatures;
- Bits UI props and consumer props compose through established repository patterns;
- snippets, bindings, events, and reactive state use idiomatic Svelte 5 constructs;
- element selection and prop forwarding produce the required behavior without leakage;
- reactive updates, teardown, and cleanup where applicable;
- focused tests, type checks, lint, and formatting;
- durable docs updates when the changed behavior needs explanation or demonstration.

Prefer durable tests for algorithms and contracts. Do not invent source-text tests solely to compensate for missing rendering infrastructure.

## Prove behavior, accessibility, SSR, and hydration

Capture expected and observed values for:

- element names and relevant attributes;
- roles, accessible names, focusability, and focus order;
- disabled, current, selected, expanded, busy, and live-region states;
- raw SSR HTML before hydration;
- hydrated DOM and interactions after startup;
- pointer and keyboard outcomes;
- navigation destination and browsing-context behavior;
- dynamic insertion, removal, resizing, scrolling, or settling behavior;
- console errors and page errors.

Use explicit assertions and preserve the observed values in evidence. DOM evidence supports visual evidence; it does not replace it.

## Prove visual parity

Always produce visual artifacts, even when the changed prop is not itself visual.

Capture paired React-versus-Svelte screenshots at identical viewport sizes for applicable combinations of:

- desktop and compact/mobile layouts;
- light and dark themes;
- default and changed states;
- hover and keyboard focus;
- active, selected, disabled, loading, expanded, or error states;
- reduced motion when animation is involved.

Prefer a side-by-side composite with React on the left and Svelte on the right. Keep full-resolution originals when creating composites.

The generated `index.html` pairs full-resolution originals without modifying them. Use it as the concise review index; create a separate composite only when a single shareable image is useful.

Inspect final captures—not preliminary screenshots—for:

- component dimensions, layout, spacing, and alignment;
- typography and icon geometry;
- colors, borders, shadows, opacity, and contrast;
- state styling and theme transitions;
- clipping, overflow, truncation, overlap, and responsive wrapping;
- visual stability during interaction.

A screenshot containing only fixture labels, raw JSON, or visually unstyled text is not visual parity evidence.

## Prove interaction parity

Produce a WEBM recording when the behavior includes interaction, animation, scrolling, focus movement, navigation, resize, or responsive transitions.

Show equivalent React and Svelte sequences, including applicable actions:

- hover, click, and drag;
- keyboard focus and activation;
- opening, closing, selection, or navigation;
- scrolling, resize, dynamic content, or layout shifts;
- theme or reduced-motion changes.

If the behavior is completely static, state why screenshots are clearer than a recording. Do not omit interaction proof merely because DOM assertions passed.

## Match capture conditions

Record viewport dimensions, device scale factor when changed, theme, motion preference, and fixture state.

Neutralize unrelated docs-shell differences only through a documented common fixture container. Do not crop away defects or hide relevant overflow. Keep captures large enough to show the component in context.

## Preserve machine-readable evidence

Save an evidence artifact containing:

- schema version and generation time;
- release, feature, and local base SHAs;
- authoritative and candidate fixture URLs;
- integration patch, fixture, screenshot, and recording hashes;
- capture conditions;
- per-framework expected and observed values;
- per-scenario pass booleans;
- console and page errors;
- visual inspection verdicts;
- discrepancies classified as blockers, intentional adaptations, or pre-existing differences;
- an overall verdict derived from individual checks.

The capture runner intentionally leaves visual verdicts and the overall parity verdict unset. After inspection, copy `review-template.json` into a separate review record and preserve the reviewer, reviewed evidence hash, verdicts, and discrepancy notes there; do not rewrite generated observations to make them pass.

Do not report only a pass count. Preserve the underlying expected and observed values.

## Gate the verdict

Recommend integration only when:

- the behavior is included in the target release;
- the implementation is minimal and idiomatic for this Svelte codebase;
- static validation passes;
- behavior, accessibility, SSR, and hydration checks pass;
- paired screenshots have been inspected;
- interaction evidence exists when behavior is dynamic;
- evidence is tied to the exact implementation and fixture versions;
- all discrepancies are explained.

If any condition is missing, name the specific evidence blocker and withhold the recommendation.

## Report the result

Return a compact proof packet:

1. release ancestry and authoritative source links;
2. gap or no-gap verdict;
3. implementation files and design;
4. static validation results;
5. authoritative and candidate fixture links;
6. paired screenshot and recording links;
7. machine-readable evidence link and hash;
8. expected-versus-observed summary;
9. discrepancies and blockers;
10. integration patch or diff provenance.
