import { mount, tick, unmount } from "svelte";
import Fixture from "./fixture.svelte";
import {
  OBSERVABLE_CONTRACT_SCHEMA,
  OBSERVABLE_CONTRACT_SCOPE,
  type ObservableAction,
  type ObservableContract,
  type ObservableExpectation,
  type ObservableNodeExpectation,
  type ObservableRelationshipExpectation,
  type ObservableVector,
} from "./contracts";

export interface ObservableRunReceipt {
  declared: number;
  executed: number;
  scope: typeof OBSERVABLE_CONTRACT_SCOPE;
}

const components = new Set(["button", "collapsible", "input"]);
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const tagPattern = /^[a-z][a-z0-9-]*$/;

function fail(path: string, message: string): never {
  throw new Error(`${path}: ${message}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function recordAt(value: unknown, path: string): Record<string, unknown> {
  if (!isRecord(value)) fail(path, "expected an object");
  return value;
}

function exactKeys(
  value: Record<string, unknown>,
  required: readonly string[],
  optional: readonly string[],
  path: string,
) {
  const allowed = new Set([...required, ...optional]);

  for (const key of required) {
    if (!Object.hasOwn(value, key)) fail(path, `missing required field "${key}"`);
  }

  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) fail(path, `unknown field "${key}"`);
  }
}

function nonEmptyString(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim() === "") fail(path, "expected a non-empty string");
  return value;
}

function selector(value: unknown, path: string): string {
  const candidate = nonEmptyString(value, path);

  try {
    document.createDocumentFragment().querySelector(candidate);
  } catch {
    fail(path, `invalid selector "${candidate}"`);
  }

  return candidate;
}

function validateSelectedRecord(
  value: unknown,
  path: string,
  isAllowed: (candidate: unknown) => boolean,
) {
  const selected = recordAt(value, path);
  if (Object.keys(selected).length === 0) fail(path, "must select at least one value");

  for (const [key, candidate] of Object.entries(selected)) {
    nonEmptyString(key, `${path} key`);
    if (!isAllowed(candidate)) fail(`${path}.${key}`, "unsupported expected value");
  }
}

function validateNode(value: unknown, path: string) {
  const node = recordAt(value, path);
  exactKeys(
    node,
    ["count", "selector"],
    ["attributes", "classes", "properties", "tag", "text"],
    path,
  );

  if (!Number.isInteger(node.count) || (node.count as number) < 0) {
    fail(`${path}.count`, "expected a non-negative integer");
  }
  if (
    node.count === 0 &&
    ["attributes", "classes", "properties", "tag", "text"].some((key) => node[key] !== undefined)
  ) {
    fail(path, "count 0 cannot include per-node expectations");
  }
  selector(node.selector, `${path}.selector`);

  if (node.tag !== undefined) {
    const tag = nonEmptyString(node.tag, `${path}.tag`);
    if (!tagPattern.test(tag)) fail(`${path}.tag`, "expected a lowercase HTML tag");
  }
  if (node.text !== undefined && typeof node.text !== "string") {
    fail(`${path}.text`, "expected a string");
  }
  if (node.attributes !== undefined) {
    validateSelectedRecord(
      node.attributes,
      `${path}.attributes`,
      (candidate) => typeof candidate === "string" || candidate === true || candidate === null,
    );
  }
  if (node.properties !== undefined) {
    validateSelectedRecord(
      node.properties,
      `${path}.properties`,
      (candidate) => typeof candidate === "string" || typeof candidate === "boolean",
    );
  }
  if (node.classes !== undefined) {
    if (!Array.isArray(node.classes) || node.classes.length === 0) {
      fail(`${path}.classes`, "expected a non-empty array");
    }
    const seen = new Set<string>();
    for (const [index, candidate] of node.classes.entries()) {
      const className = nonEmptyString(candidate, `${path}.classes[${index}]`);
      if (/\s/.test(className)) fail(`${path}.classes[${index}]`, "expected one class token");
      if (seen.has(className)) fail(`${path}.classes[${index}]`, "duplicate class token");
      seen.add(className);
    }
  }
}

function validateRelationship(value: unknown, path: string) {
  const relationship = recordAt(value, path);
  exactKeys(relationship, ["attribute", "from", "targetAttribute", "to"], [], path);
  nonEmptyString(relationship.attribute, `${path}.attribute`);
  selector(relationship.from, `${path}.from`);
  nonEmptyString(relationship.targetAttribute, `${path}.targetAttribute`);
  selector(relationship.to, `${path}.to`);
}

function validateAction(value: unknown, path: string) {
  const action = recordAt(value, path);
  if (action.type === "click") {
    exactKeys(action, ["selector", "type"], [], path);
  } else if (action.type === "press") {
    exactKeys(action, ["key", "selector", "type"], [], path);
    nonEmptyString(action.key, `${path}.key`);
  } else if (action.type === "type") {
    exactKeys(action, ["selector", "type", "value"], [], path);
    if (typeof action.value !== "string") fail(`${path}.value`, "expected a string");
  } else {
    fail(`${path}.type`, "unsupported action");
  }
  selector(action.selector, `${path}.selector`);
}

function validateExpectation(value: unknown, path: string, hasActions: boolean) {
  const expected = recordAt(value, path);
  exactKeys(expected, ["nodes"], ["events", "focus", "relationships"], path);

  if (!Array.isArray(expected.nodes) || expected.nodes.length === 0) {
    fail(`${path}.nodes`, "expected at least one semantic node assertion");
  }
  expected.nodes.forEach((node, index) => validateNode(node, `${path}.nodes[${index}]`));

  if (expected.relationships !== undefined) {
    if (!Array.isArray(expected.relationships) || expected.relationships.length === 0) {
      fail(`${path}.relationships`, "expected a non-empty array");
    }
    expected.relationships.forEach((relationship, index) =>
      validateRelationship(relationship, `${path}.relationships[${index}]`),
    );
  }

  if (expected.events !== undefined) {
    if (!Array.isArray(expected.events)) fail(`${path}.events`, "expected an array");
    expected.events.forEach((event, index) => nonEmptyString(event, `${path}.events[${index}]`));
  }
  if (hasActions && expected.events === undefined) {
    fail(`${path}.events`, "interactive vectors must declare expected events, including []");
  }
  if (!hasActions && (expected.events !== undefined || expected.focus !== undefined)) {
    fail(path, "events and focus require actions");
  }
  if (expected.focus !== undefined) selector(expected.focus, `${path}.focus`);
}

function validateVector(value: unknown, path: string) {
  const vector = recordAt(value, path);
  exactKeys(vector, ["expected", "fixtureCase", "id"], ["actions"], path);

  const id = nonEmptyString(vector.id, `${path}.id`);
  if (!idPattern.test(id)) fail(`${path}.id`, "expected a lowercase kebab-case ID");
  nonEmptyString(vector.fixtureCase, `${path}.fixtureCase`);

  let hasActions = false;
  if (vector.actions !== undefined) {
    if (!Array.isArray(vector.actions) || vector.actions.length === 0) {
      fail(`${path}.actions`, "expected a non-empty array");
    }
    hasActions = true;
    vector.actions.forEach((action, index) => validateAction(action, `${path}.actions[${index}]`));
  }
  validateExpectation(vector.expected, `${path}.expected`, hasActions);
}

export function validateObservableContracts(input: unknown): asserts input is ObservableContract[] {
  if (!Array.isArray(input) || input.length === 0) {
    fail("contracts", "expected at least one contract");
  }

  const seenComponents = new Set<string>();
  input.forEach((value, contractIndex) => {
    const path = `contracts[${contractIndex}]`;
    const contract = recordAt(value, path);
    exactKeys(contract, ["component", "schemaVersion", "scope", "vectors"], [], path);

    if (contract.schemaVersion !== OBSERVABLE_CONTRACT_SCHEMA) {
      fail(`${path}.schemaVersion`, `expected "${OBSERVABLE_CONTRACT_SCHEMA}"`);
    }
    if (contract.scope !== OBSERVABLE_CONTRACT_SCOPE) {
      fail(`${path}.scope`, `expected "${OBSERVABLE_CONTRACT_SCOPE}"`);
    }
    if (!components.has(contract.component as string)) {
      fail(`${path}.component`, "unsupported component");
    }
    if (seenComponents.has(contract.component as string)) {
      fail(`${path}.component`, "duplicate component contract");
    }
    seenComponents.add(contract.component as string);

    if (!Array.isArray(contract.vectors) || contract.vectors.length === 0) {
      fail(`${path}.vectors`, "expected at least one vector");
    }
    const seenIds = new Set<string>();
    contract.vectors.forEach((vector, vectorIndex) => {
      validateVector(vector, `${path}.vectors[${vectorIndex}]`);
      const id = (vector as Record<string, unknown>).id as string;
      if (seenIds.has(id)) fail(`${path}.vectors[${vectorIndex}].id`, "duplicate vector ID");
      seenIds.add(id);
    });
  });
}

function oneElement(container: ParentNode, candidate: string, path: string): Element {
  const matches = container.querySelectorAll(candidate);
  if (matches.length !== 1)
    fail(path, `selector "${candidate}" matched ${matches.length}, expected 1`);
  return matches[0];
}

function normalizeText(value: string | null) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function assertNode(container: ParentNode, expected: ObservableNodeExpectation, path: string) {
  const matches = [...container.querySelectorAll(expected.selector)];
  if (matches.length !== expected.count) {
    fail(
      path,
      `selector "${expected.selector}" matched ${matches.length}, expected ${expected.count}`,
    );
  }

  for (const element of matches) {
    if (expected.tag !== undefined && element.tagName.toLowerCase() !== expected.tag) {
      fail(path, `expected tag "${expected.tag}", observed "${element.tagName.toLowerCase()}"`);
    }
    if (expected.text !== undefined && normalizeText(element.textContent) !== expected.text) {
      fail(
        path,
        `expected text "${expected.text}", observed "${normalizeText(element.textContent)}"`,
      );
    }
    for (const className of expected.classes ?? []) {
      if (!element.classList.contains(className)) fail(path, `missing class "${className}"`);
    }
    for (const [name, value] of Object.entries(expected.attributes ?? {})) {
      if (value === true && !element.hasAttribute(name)) fail(path, `missing attribute "${name}"`);
      if (value === null && element.hasAttribute(name))
        fail(path, `unexpected attribute "${name}"`);
      if (typeof value === "string" && element.getAttribute(name) !== value) {
        fail(
          path,
          `expected attribute ${name}="${value}", observed ${name}="${element.getAttribute(name)}"`,
        );
      }
    }
    for (const [name, value] of Object.entries(expected.properties ?? {})) {
      const observed = (element as unknown as Record<string, unknown>)[name];
      if (observed !== value)
        fail(
          path,
          `expected property ${name}=${JSON.stringify(value)}, observed ${JSON.stringify(observed)}`,
        );
    }
  }
}

function assertRelationship(
  container: ParentNode,
  expected: ObservableRelationshipExpectation,
  path: string,
) {
  const from = oneElement(container, expected.from, `${path}.from`);
  const to = oneElement(container, expected.to, `${path}.to`);
  const sourceValue = from.getAttribute(expected.attribute);
  const targetValue = to.getAttribute(expected.targetAttribute);

  if (sourceValue === null || targetValue === null || sourceValue !== targetValue) {
    fail(
      path,
      `expected ${expected.from}[${expected.attribute}] to reference ${expected.to}[${expected.targetAttribute}]`,
    );
  }
}

function assertOutcome(
  container: ParentNode,
  expected: ObservableExpectation,
  events: readonly string[],
  path: string,
) {
  expected.nodes.forEach((node, index) => assertNode(container, node, `${path}.nodes[${index}]`));
  expected.relationships?.forEach((relationship, index) =>
    assertRelationship(container, relationship, `${path}.relationships[${index}]`),
  );

  if (expected.events !== undefined && JSON.stringify(events) !== JSON.stringify(expected.events)) {
    fail(
      path,
      `expected events ${JSON.stringify(expected.events)}, observed ${JSON.stringify(events)}`,
    );
  }
  if (expected.focus !== undefined) {
    const focused = oneElement(container, expected.focus, `${path}.focus`);
    if (document.activeElement !== focused) fail(path, `expected focus on "${expected.focus}"`);
  }
}

async function performAction(container: ParentNode, action: ObservableAction, path: string) {
  const element = oneElement(container, action.selector, path);

  if (action.type === "click") {
    if (!(element instanceof HTMLElement)) {
      fail(
        path,
        `click action requires an HTML element, observed ${element.tagName.toLowerCase()}`,
      );
    }
    element.focus();
    element.click();
  } else if (action.type === "type") {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
      fail(
        path,
        `type action requires an input or textarea, observed ${element.tagName.toLowerCase()}`,
      );
    }
    element.focus();
    element.value = action.value;
    element.dispatchEvent(new InputEvent("input", { bubbles: true, data: action.value }));
  } else {
    if (!(element instanceof HTMLElement)) {
      fail(
        path,
        `press action requires an HTML element, observed ${element.tagName.toLowerCase()}`,
      );
    }
    element.focus();
    const keydown = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key: action.key,
    });
    element.dispatchEvent(keydown);
    if (
      !keydown.defaultPrevented &&
      element instanceof HTMLButtonElement &&
      action.key === "Enter"
    ) {
      element.click();
    }
    element.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, key: action.key }));
  }

  await tick();
}

async function runVector(contract: ObservableContract, vector: ObservableVector) {
  document.body.replaceChildren();
  const target = document.createElement("div");
  document.body.append(target);
  const events: string[] = [];
  const instance = mount(Fixture, {
    props: {
      component: contract.component,
      fixtureCase: vector.fixtureCase,
      record: (event: string) => events.push(event),
    },
    target,
  });

  try {
    await tick();
    for (const [index, action] of (vector.actions ?? []).entries()) {
      await performAction(target, action, `${contract.component}/${vector.id}.actions[${index}]`);
    }
    assertOutcome(target, vector.expected, events, `${contract.component}/${vector.id}.expected`);
  } finally {
    await unmount(instance);
    document.body.replaceChildren();
  }
}

export async function runObservableContracts(input: unknown): Promise<ObservableRunReceipt> {
  validateObservableContracts(input);
  const declared = input.reduce((total, contract) => total + contract.vectors.length, 0);
  let executed = 0;

  for (const contract of input) {
    for (const vector of contract.vectors) {
      await runVector(contract, vector);
      executed += 1;
    }
  }

  if (declared === 0 || executed !== declared) {
    fail("receipt", `incomplete execution: ${executed}/${declared} vectors`);
  }

  return { declared, executed, scope: OBSERVABLE_CONTRACT_SCOPE };
}
