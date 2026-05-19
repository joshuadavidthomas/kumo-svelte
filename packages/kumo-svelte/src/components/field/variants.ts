import { cn } from "../../utils/cn";

export const KUMO_FIELD_VARIANTS = {} as const;

export const KUMO_FIELD_DEFAULT_VARIANTS = {} as const;

export interface KumoFieldVariantsProps {
  controlFirst?: boolean;
}

export function fieldVariants({ controlFirst = false }: KumoFieldVariantsProps = {}) {
  return cn(
    "grid gap-2",
    "has-[input[type=checkbox]]:grid-cols-[auto_1fr] has-[input[type=checkbox]]:items-center",
    "has-[[role=switch]]:grid-cols-[auto_1fr] has-[[role=switch]]:items-center",
    controlFirst && [
      "has-[input[type=checkbox]]:flex has-[input[type=checkbox]]:flex-row-reverse has-[input[type=checkbox]]:flex-wrap has-[input[type=checkbox]]:items-center",
      "has-[[role=switch]]:flex has-[[role=switch]]:flex-row-reverse has-[[role=switch]]:flex-wrap has-[[role=switch]]:items-center",
      "[&>label]:flex-1",
    ],
  );
}
