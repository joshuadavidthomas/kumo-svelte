import { cn } from "../../utils/cn";

export const KUMO_METER_VARIANTS = {} as const;
export const KUMO_METER_DEFAULT_VARIANTS = {} as const;

export interface KumoMeterVariantsProps {}

export function meterVariants(_props: KumoMeterVariantsProps = {}) {
  return cn("flex w-full flex-col gap-2");
}
