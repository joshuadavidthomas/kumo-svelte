import type { PortalProps } from "bits-ui";
import { getContext, setContext } from "svelte";

const KUMO_PORTAL_CONTEXT = Symbol("kumo-portal-context");

export type PortalContainer = PortalProps["to"] | undefined;

export interface KumoPortalContextValue {
  container: PortalContainer;
}

export class KumoPortalContextState implements KumoPortalContextValue {
  container = $state<PortalContainer>();
}

export function setKumoPortalContext(context: KumoPortalContextState) {
  return setContext(KUMO_PORTAL_CONTEXT, context);
}

export function getKumoPortalContext(): KumoPortalContextValue {
  return (
    getContext<KumoPortalContextValue | undefined>(KUMO_PORTAL_CONTEXT) ?? {
      container: undefined,
    }
  );
}

export function usePortalContainer(): PortalContainer {
  return getKumoPortalContext().container;
}
