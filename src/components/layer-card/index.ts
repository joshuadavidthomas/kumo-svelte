import type { ComponentProps } from "svelte";
import LayerCardPrimaryComponent from "./layer-card-primary.svelte";
import LayerCardSecondaryComponent from "./layer-card-secondary.svelte";
import LayerCardComponent from "./layer-card.svelte";

export { default as LayerCard } from "./layer-card.svelte";
export { default as LayerCardPrimary } from "./layer-card-primary.svelte";
export { default as LayerCardSecondary } from "./layer-card-secondary.svelte";

export type LayerCardProps = ComponentProps<typeof LayerCardComponent>;
export type LayerCardPrimaryProps = ComponentProps<typeof LayerCardPrimaryComponent>;
export type LayerCardSecondaryProps = ComponentProps<typeof LayerCardSecondaryComponent>;

export {
  layerCardVariants,
  KUMO_LAYER_CARD_DEFAULT_VARIANTS,
  KUMO_LAYER_CARD_VARIANTS,
  LAYER_CARD_LAYERED_ROOT_CLASSES,
  LAYER_CARD_PRIMARY_CLASSES,
  LAYER_CARD_SECONDARY_CLASSES,
  LAYER_CARD_SURFACE_CLASSES,
  type KumoLayerCardVariantsProps,
} from "./variants";
