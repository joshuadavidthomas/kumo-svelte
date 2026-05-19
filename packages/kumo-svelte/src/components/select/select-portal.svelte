<script lang="ts">
  import { Select as SelectPrimitive } from "bits-ui";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";

  export type SelectPortalProps = SelectPrimitive.PortalProps;

  let { children, to, ...restProps }: SelectPortalProps = $props();

  const portalContext = getKumoPortalContext();
  let portalContainer = $derived(to ?? portalContext.container);
</script>

<SelectPrimitive.Portal to={portalContainer} {...restProps}>
  {@render children?.()}
</SelectPrimitive.Portal>
