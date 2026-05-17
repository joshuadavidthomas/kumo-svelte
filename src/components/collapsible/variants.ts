import { cn } from "../../utils/cn";

export const KUMO_COLLAPSIBLE_VARIANTS = {} as const;
export const KUMO_COLLAPSIBLE_DEFAULT_VARIANTS = {} as const;

export interface KumoCollapsibleVariantsProps {}

export function collapsibleVariants(_props: KumoCollapsibleVariantsProps = {}) {
  return cn();
}
