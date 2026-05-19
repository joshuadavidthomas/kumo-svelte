import type { ComponentProps } from "svelte";
import SurfaceComponent from "./surface.svelte";

export { default as Surface } from "./surface.svelte";
export type SurfaceProps = ComponentProps<typeof SurfaceComponent>;
export {
  surfaceVariants,
  KUMO_SURFACE_DEFAULT_VARIANTS,
  KUMO_SURFACE_VARIANTS,
  type KumoSurfaceColor,
  type KumoSurfaceVariantsProps,
} from "./variants";
