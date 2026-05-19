import type { Component, Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import { getContext, setContext } from "svelte";

const KUMO_LINK_CONTEXT = Symbol("kumo-link-context");

export interface LinkComponentProps extends Omit<HTMLAnchorAttributes, "children"> {
  children?: Snippet;
  to?: string;
}

export type LinkComponent = Component<LinkComponentProps>;

export interface KumoLinkContextValue {
  component?: LinkComponent;
}

export class KumoLinkContextState implements KumoLinkContextValue {
  component = $state<LinkComponent>();
}

export function setKumoLinkContext(context: KumoLinkContextState) {
  return setContext(KUMO_LINK_CONTEXT, context);
}

export function getKumoLinkContext(): KumoLinkContextValue {
  return getContext<KumoLinkContextValue | undefined>(KUMO_LINK_CONTEXT) ?? {};
}

export function useLinkComponent(): LinkComponent | undefined {
  return getKumoLinkContext().component;
}
