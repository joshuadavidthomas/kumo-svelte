import { cn } from "../../utils/cn";

export const KUMO_LABEL_VARIANTS = {} as const;
export const KUMO_LABEL_DEFAULT_VARIANTS = {} as const;

export interface KumoLabelVariantsProps {}

export function labelVariants(_props: KumoLabelVariantsProps = {}) {
  return cn("m-0 text-base font-medium text-kumo-default");
}

export function labelContentVariants() {
  return cn("inline-flex items-center gap-1");
}
