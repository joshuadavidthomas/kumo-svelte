export const OBSERVABLE_CONTRACT_SCHEMA = "kumo-svelte.observable/v1" as const;
export const OBSERVABLE_CONTRACT_SCOPE = "local-svelte-regression" as const;

export type ObservableComponent = "button" | "collapsible" | "input";

export type ObservableAction =
  | { selector: string; type: "click" }
  | { key: string; selector: string; type: "press" }
  | { selector: string; type: "type"; value: string };

export type ObservableAttributeValue = null | string | true;
export type ObservablePropertyValue = boolean | string;

export interface ObservableNodeExpectation {
  attributes?: Record<string, ObservableAttributeValue>;
  classes?: readonly string[];
  count: number;
  properties?: Record<string, ObservablePropertyValue>;
  selector: string;
  tag?: string;
  text?: string;
}

export interface ObservableRelationshipExpectation {
  attribute: string;
  from: string;
  targetAttribute: string;
  to: string;
}

export interface ObservableExpectation {
  events?: readonly string[];
  focus?: string;
  nodes: readonly ObservableNodeExpectation[];
  relationships?: readonly ObservableRelationshipExpectation[];
}

export interface ObservableVector {
  actions?: readonly ObservableAction[];
  expected: ObservableExpectation;
  fixtureCase: string;
  id: string;
}

export interface ObservableContract {
  component: ObservableComponent;
  schemaVersion: typeof OBSERVABLE_CONTRACT_SCHEMA;
  scope: typeof OBSERVABLE_CONTRACT_SCOPE;
  vectors: readonly ObservableVector[];
}

const buttonContract: ObservableContract = {
  component: "button",
  schemaVersion: OBSERVABLE_CONTRACT_SCHEMA,
  scope: OBSERVABLE_CONTRACT_SCOPE,
  vectors: [
    {
      actions: [{ selector: 'button[data-slot="button"]', type: "click" }],
      expected: {
        events: ["click"],
        focus: 'button[data-slot="button"]',
        nodes: [
          {
            attributes: {
              "data-shape": "base",
              "data-size": "base",
              "data-variant": "primary",
              disabled: null,
              type: "button",
            },
            classes: ["bg-kumo-brand", "h-9"],
            count: 1,
            selector: 'button[data-slot="button"]',
            tag: "button",
            text: "Save changes",
          },
        ],
      },
      fixtureCase: "enabled-primary",
      id: "enabled-primary-click",
    },
    {
      actions: [{ key: "Enter", selector: 'button[data-slot="button"]', type: "press" }],
      expected: {
        events: ["click"],
        focus: 'button[data-slot="button"]',
        nodes: [
          {
            attributes: { disabled: null, type: "button" },
            count: 1,
            selector: 'button[data-slot="button"]',
            tag: "button",
            text: "Save changes",
          },
        ],
      },
      fixtureCase: "enabled-primary",
      id: "enabled-primary-keyboard-activation",
    },
    {
      actions: [{ selector: 'button[data-slot="button"]', type: "click" }],
      expected: {
        events: [],
        nodes: [
          {
            attributes: { disabled: true, type: "button" },
            count: 1,
            selector: 'button[data-slot="button"]',
            tag: "button",
            text: "Save changes",
          },
          {
            attributes: { "aria-hidden": "true", role: "status" },
            count: 1,
            selector: 'button[data-slot="button"] svg',
            tag: "svg",
          },
        ],
      },
      fixtureCase: "loading",
      id: "loading-disables-activation",
    },
  ],
};

const inputContract: ObservableContract = {
  component: "input",
  schemaVersion: OBSERVABLE_CONTRACT_SCHEMA,
  scope: OBSERVABLE_CONTRACT_SCOPE,
  vectors: [
    {
      expected: {
        nodes: [
          {
            attributes: {
              id: "contract-email",
              name: "email",
              required: true,
              type: "email",
            },
            classes: ["bg-kumo-control", "h-9"],
            count: 1,
            selector: "input#contract-email",
            tag: "input",
          },
          {
            count: 1,
            selector: "label",
            tag: "label",
            text: "Email address",
          },
          {
            count: 1,
            selector: "p",
            tag: "p",
            text: "Used for account alerts.",
          },
        ],
        relationships: [
          {
            attribute: "for",
            from: "label",
            targetAttribute: "id",
            to: "input#contract-email",
          },
        ],
      },
      fixtureCase: "labeled",
      id: "label-description-and-required-control",
    },
    {
      actions: [{ selector: 'input[aria-label="Search query"]', type: "type", value: "edge" }],
      expected: {
        events: ["input:edge"],
        focus: 'input[aria-label="Search query"]',
        nodes: [
          {
            attributes: { "aria-label": "Search query", name: "query" },
            count: 1,
            properties: { value: "edge" },
            selector: 'input[aria-label="Search query"]',
            tag: "input",
          },
        ],
      },
      fixtureCase: "interactive",
      id: "typing-updates-value-and-focus",
    },
  ],
};

const collapsibleContract: ObservableContract = {
  component: "collapsible",
  schemaVersion: OBSERVABLE_CONTRACT_SCHEMA,
  scope: OBSERVABLE_CONTRACT_SCOPE,
  vectors: [
    {
      actions: [{ selector: '[data-slot="collapsible-trigger"]', type: "click" }],
      expected: {
        events: ["open:true"],
        focus: '[data-slot="collapsible-trigger"]',
        nodes: [
          {
            attributes: { "aria-expanded": "true", "data-state": "open" },
            count: 1,
            selector: '[data-slot="collapsible-trigger"]',
            tag: "button",
            text: "Advanced settings",
          },
          {
            attributes: { "data-state": "open" },
            count: 1,
            selector: '[data-slot="collapsible-content"]',
            text: "Retention: 30 days",
          },
        ],
        relationships: [
          {
            attribute: "aria-controls",
            from: '[data-slot="collapsible-trigger"]',
            targetAttribute: "id",
            to: '[data-slot="collapsible-content"]',
          },
        ],
      },
      fixtureCase: "default",
      id: "trigger-opens-related-panel",
    },
  ],
};

export const observableContracts: readonly ObservableContract[] = [
  buttonContract,
  inputContract,
  collapsibleContract,
];
