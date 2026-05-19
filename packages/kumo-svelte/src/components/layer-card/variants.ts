import { cn } from "../../utils/cn";

export const LAYER_CARD_SURFACE_CLASSES =
  "overflow-hidden rounded-lg bg-kumo-base shadow-xs ring ring-kumo-line";
export const LAYER_CARD_LAYERED_ROOT_CLASSES =
  "flex w-full flex-col overflow-hidden rounded-lg bg-kumo-elevated text-base ring ring-kumo-hairline";
export const LAYER_CARD_SECONDARY_CLASSES =
  "-my-2 flex items-center gap-2 bg-kumo-elevated p-4 text-base font-medium text-kumo-subtle";
export const LAYER_CARD_PRIMARY_CLASSES =
  "relative flex flex-col gap-2 overflow-hidden rounded-lg bg-kumo-base p-4 pr-3 text-inherit no-underline ring ring-kumo-fill";

export const KUMO_LAYER_CARD_VARIANTS = {} as const;
export const KUMO_LAYER_CARD_DEFAULT_VARIANTS = {} as const;

export interface KumoLayerCardVariantsProps {}

export function layerCardVariants(_props: KumoLayerCardVariantsProps = {}) {
  return cn(LAYER_CARD_SURFACE_CLASSES);
}
