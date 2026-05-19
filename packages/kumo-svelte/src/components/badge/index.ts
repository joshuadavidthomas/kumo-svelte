import type { ComponentProps } from "svelte";
import BadgeComponent from "./badge.svelte";

export { default as Badge } from "./badge.svelte";
export type BadgeProps = ComponentProps<typeof BadgeComponent>;
export {
  badgeVariants,
  KUMO_BADGE_BASE_STYLES,
  KUMO_BADGE_DEFAULT_VARIANTS,
  KUMO_BADGE_VARIANTS,
  type BadgeVariant,
  type KumoBadgeVariant,
  type KumoBadgeVariantsProps,
} from "./variants";
