import type { ComponentProps } from "svelte";
import BannerComponent from "./banner.svelte";

export { default as Banner } from "./banner.svelte";
export type BannerProps = ComponentProps<typeof BannerComponent>;
export {
  bannerIconVariants,
  bannerVariants,
  KUMO_BANNER_BASE_STYLES,
  KUMO_BANNER_DEFAULT_VARIANTS,
  KUMO_BANNER_VARIANTS,
  type BannerVariant,
  type KumoBannerVariant,
  type KumoBannerVariantsProps,
} from "./variants";
