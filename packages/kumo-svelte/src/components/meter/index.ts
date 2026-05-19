import type { ComponentProps } from "svelte";
import MeterComponent from "./meter.svelte";

export { default as Meter } from "./meter.svelte";
export type MeterProps = ComponentProps<typeof MeterComponent>;
export {
  meterVariants,
  KUMO_METER_DEFAULT_VARIANTS,
  KUMO_METER_VARIANTS,
  type KumoMeterVariantsProps,
} from "./variants";
