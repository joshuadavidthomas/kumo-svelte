# Observable regression contracts

These internal, test-only contracts preserve selected accepted behavior of the local Svelte package. They execute semantic DOM, selected attributes and classes, normalized text, events, control state, focus, and accessibility relationships in Vitest. Their click, type, and keyboard-press outcomes are also consumed by the packed-package Chromium pilot without importing test code into the temporary application. The schema and execution receipt fail closed for empty, malformed, unsupported, or incomplete inputs.

The contracts are durable product regression assertions, not visual evidence. The packed-package pilot covers only its named Button, Input, and Collapsible vectors in one Chromium engine; it is not a package-wide result. These contracts do not establish ancestry to a particular upstream Kumo release, React parity, pixel parity, accessibility certification, or ship readiness. Generated IDs, complete utility-class strings, wrapper markup, and React prop shapes are deliberately outside the vocabulary.

## Promotion from exploratory proof

An accepted scenario from the exploratory `.amp` parity runner can be promoted manually by translating only its reviewed stable outcomes into a new local vector and fixture case. Keep screenshots, recordings, release provenance, reviewed-evidence hash, and human visual verdicts in the exploratory evidence; generated evidence does not authorize promotion by itself. Add an upstream source or release note here only when that ancestry has been independently verified. The current selectors are explicitly Svelte-local execution details; a future schema version or adapter can add framework-specific selector maps while retaining the semantic node, event, state, focus, and relationship outcomes.
