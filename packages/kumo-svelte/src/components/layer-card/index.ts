import type { ComponentProps } from "svelte";
import LayerCardPrimaryComponent from "./layer-card-primary.svelte";
import LayerCardSecondaryComponent from "./layer-card-secondary.svelte";
import LayerCardComponent from "./layer-card.svelte";

const LayerCard = Object.assign(LayerCardComponent, {
  Root: LayerCardComponent,
  Primary: LayerCardPrimaryComponent,
  Secondary: LayerCardSecondaryComponent,
});

export {
  LayerCard,
  LayerCardComponent as LayerCardRoot,
  LayerCardComponent as Root,
  LayerCardPrimaryComponent as LayerCardPrimary,
  LayerCardPrimaryComponent as Primary,
  LayerCardSecondaryComponent as LayerCardSecondary,
  LayerCardSecondaryComponent as Secondary,
};

export type LayerCardProps = ComponentProps<typeof LayerCardComponent>;
export type LayerCardRootProps = LayerCardProps;
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
